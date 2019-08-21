const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { reduceRight } = require('lodash');
const { root_directory } = require('../utils');

const description = 'Generate a new page with it\'s assets';

const command = (routePath, options) => {
    if (!routePath || !options) {
        console.red('Must enter a page name and it\'s route path');
        return;
    } else if (!root_directory()) {
        console.red('Must run this command in the root directory of your project.');
        return;
    } else if (!routePath.match(/\//g) && routePath[0] !== '/') {
        console.red('Must a string argument of the url route for this page.');
        return;
    }

    const root = process.cwd();
    const settings = require(path.join(root, 'config', 'webpack', 'settings.js'));
    const pathRoute = routePath.slice().split('/');
    const pageName = reduceRight(pathRoute, (acc, item) => {
        if (!acc && !item.match(/\:/g)) {
            acc = item;
        }
        return acc;
    }, false);

    if (fs.existsSync(path.join(root, 'app', 'views', 'pages', routePath, `${pageName}.pug`))) {
        console.red('Page already exists.');
        return;
    }

    const storageTypes = {
        js: 'storage',
        ts: 'redux',
        jsx: 'redux',
        vue: 'state',
    }

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    const templates = fs.readFileSync(path.join(templatePath, 'assets', 'page.pug'), { encoding: 'utf8' });
    const newTemplateAssets = templates.replace(/\/CLIPAGE/g, `${routePath}/${pageName}`);
    const reduxRegex = new RegExp('// Redux here', 'ig');
    const styleRegex = new RegExp('// Route Path', 'ig');
    const routePathDepth = routePath.split('/').map(e => '../').join('');
    const pugTitle = newTemplateAssets.replace(/include \.\/utils\/new-page\.pug/g, `include ${routePathDepth}utils/new-page.pug`);
    const scriptsPage = pugTitle.replace(/include \.\/utils\/scripts\.pug/g, `include ${routePathDepth}utils/scripts.pug`);
    const newTemplate = scriptsPage.replace(/include \.\/utils\/meta\.pug/g, `include ${routePathDepth}utils/meta.pug`);

    const application = fs.readFileSync(path.join(root, 'app', 'index.js'), { encoding: 'utf8' });
    shell.exec(`mkdir -p ${path.join(root, 'app', 'views', 'pages', routePath)} ${path.join(root, 'app', 'assets', settings.styleType, 'pages', routePath)} ${path.join(root, 'app', 'assets', settings.jsType, 'pages', routePath)}`);
    fs.writeFileSync(path.join(root, 'app', 'views', 'pages', routePath, `${pageName}.pug`), newTemplate);
    shell.cp(path.join(templatePath, 'assets', `page.${settings.styleType}`), path.join(root, 'app', 'assets', settings.styleType, 'pages', routePath, `${pageName}.${settings.styleType}`));
    shell.cp(path.join(templatePath, 'assets', `${settings.jsType === 'vue' ? 'vue' : 'page'}.${settings.jsType === 'vue' ? 'js' : settings.jsType}`), path.join(root, 'app', 'assets', settings.jsType, 'pages', routePath, `${pageName}.${settings.jsType === 'vue' ? 'js' : settings.jsType}`));
    if (fs.existsSync(path.join(templatePath, 'assets', `component.${settings.jsType}`))) shell.cp(path.join(templatePath, 'assets', `component.${settings.jsType}`), path.join(root, 'app', 'assets', settings.jsType, 'pages', routePath, `component.${settings.jsType}`));
    const reduxPath = path.join(root, 'app', 'assets', settings.jsType, 'pages', routePath, `${pageName}.${settings.jsType === 'vue' ? 'js' : settings.jsType}`);
    const reduxFs = fs.readFileSync(reduxPath, { encoding: 'utf8' });
    fs.writeFileSync(reduxPath, reduxFs.replace(reduxRegex, `${routePathDepth}${storageTypes[settings.jsType]}/store`).replace(styleRegex, `${routePathDepth}../${settings.styleType}/pages${routePath}/${pageName}`));
    if (routePath) fs.writeFileSync(path.join(root, 'app', 'index.js'), application.replace(/\/\/ Leave Here For Static Routes/g, `// Leave Here For Static Routes\napp.getAsync('${routePath}', render('pages${routePath}/${pageName}', { hashId: global.hashId }));`));
    console.green('Your new page assets have be created.');
};

const documentation = () => {
    console.cyan(`
Command:
Route Path: '/route-path'
=> Adding a route path will autogenerate a route with all it's assets

node-rails new-page (url-route-path)
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
