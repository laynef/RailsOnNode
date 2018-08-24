const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const description = 'Generate a new page with it\'s assets';

const command = (pageName, routePath, options) => {
    if (!pageName || !routePath || !options) {
        console.red('Must enter a page name and it\'s route path');
        return;
    }

    const root = process.cwd();
    const settings = require(path.join(root, 'webpack', 'settings.js'));

    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    const templates = fs.readFileSync(path.join(templatePath, 'assets', 'page.pug'), { encoding: 'utf8' });
    const newTemplateAssets = templates.replace(/\/CLIPAGE/g, `${routePath}/${pageName}`);
    const routePathDepth = routePath.split('/').map(e => '../').join('');
    const pugTitle = newTemplateAssets.replace(/include \.\/utils\/new-page\.pug/g, `include ${routePathDepth}utils/new-page.pug`);
    const scriptsPage = pugTitle.replace(/include \.\/utils\/scripts\.pug/g, `include ${routePathDepth}utils/scripts.pug`);
    const newTemplate = scriptsPage.replace(/include \.\/utils\/meta\.pug/g, `include ${routePathDepth}utils/meta.pug`);

    const application = fs.readFileSync(path.join(root, 'app.js'), { encoding: 'utf8' });
    shell.exec(`mkdir -p ${path.join(root, 'views', 'pages', routePath)} ${path.join(root, 'assets', settings.styleType, 'pages', routePath)} ${path.join(root, 'assets', settings.jsType, 'pages', routePath)}`);
    fs.writeFileSync(path.join(root, 'views', 'pages', routePath, `${pageName}.pug`), newTemplate);
    shell.cp(path.join(templatePath, 'assets', `page.${settings.styleType}`), path.join(root, 'assets', settings.styleType, 'pages', routePath, `${pageName}.${settings.styleType}`));
    shell.cp(path.join(templatePath, 'assets', `page.${settings.jsType}`), path.join(root, 'assets', settings.jsType, 'pages', routePath, `${pageName}.${settings.jsType}`));
    if (routePath) fs.writeFileSync(path.join(root, 'app.js'), application.replace(/\/\/ Leave Here For Static Routes/g, `// Leave Here For Static Routes\napp.get('${routePath}', render('pages${routePath}/${pageName}', { hashId: makeHash(40), ...serverSide('${pageName}', req) }));`));
    console.green('Your new page assets have be created.');
};

const documentation = () => {
    console.yellow(`
Command:
Route Path: '/route-path'
=> Adding a route path will autogenerate a route with all it's assets

node-rails new-page <page-name> <route-path>
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
