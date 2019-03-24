const fs = require('fs');
const path = require('path');


const description = 'Update old versions for legacy support on react setting only';

const command = (options) => {
    const root = process.cwd();
    const jsx_path = path.join(root, 'assets', 'jsx');
    const error_pug_path = path.join(root, 'views', 'errors');
    const page_pug_path = path.join(root, 'views', 'pages');
    const assets_path = path.join(jsx_path, 'pages');
    const settings = require(path.join(root, 'webpack', 'settings.js'));

    const get_dot_path = (leng) => {
        let str = '';
        for (let i = 0; i < leng; i++) {
            str += '../';
        }
        return str;
    };

    const recursive = (dir_path) => {
        fs.readdirSync(dir_path).map((pathnm) => {
            const file_path = path.join(dir_path, pathnm);
            if (fs.lstatSync(file_path).isDirectory()) {
                recursive(file_path);
            } else {
                const filename = file_path.split('/').pop();
                const suffix = filename.slice(0).split('.').pop();
                const basename = filename.slice(0).split('.').shift();
                if (filename !== 'component.jsx' && suffix === 'jsx') {
                    const file_dot_path = file_path.split('/').length;
                    const assets_dot_path = assets_path.split('/').length;
                    const redux_dot_path = file_dot_path - assets_dot_path;
                    const route_dot_path = file_dot_path - assets_dot_path + 1;
                    const redux_regex = new RegExp(`// Redux here`, 'g');
                    const route_regex = new RegExp(`// Route Path`, 'g');
                    const route_string = `${get_dot_path(route_dot_path)}${settings.styleType}/pages/${
                        basename === '404' ||
                        basename === '403' ||
                        basename === '500' ? 'errors/' : ''
                    }${basename}${basename !== 'index' ? '/' + basename : ''}`;
                    const redux_string = `${get_dot_path(redux_dot_path)}redux/store`;
                    const root_file_path = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.jsx');
                    let template_string = fs.readFileSync(root_file_path, { encoding: 'utf8' });
                    template_string = template_string.replace(route_regex, route_string);
                    template_string = template_string.replace(redux_regex, redux_string);
                    fs.writeFileSync(file_path, template_string);
                }
                if (suffix === 'pug') {
                    const pug_regex = new RegExp(`\.\/utils\/`, 'g');
                    const pug_template = path.join(__dirname, '..', '..', '..', 'templates', 'assets', 'page.pug');
                    const file_dot_path = file_path.split('/').length;
                    const assets_dot_path = assets_path.split('/').length;
                    const pug_dot_path = file_dot_path - assets_dot_path + 1;
                    let template_string = fs.readFileSync(pug_template, { encoding: 'utf8' });
                    const pug_dots = get_dot_path(pug_dot_path);
                    template_string = template_string.replace(pug_regex, pug_dots + 'utils/');
                    fs.writeFileSync(file_path, template_string);
                }
            }
        });
    };

    const template_redux_path = path.join(__dirname, '..', '..', '..', 'templates', 'redux', 'react', 'store.jsx');
    const root_redux_path = path.join(jsx_path, 'redux', 'store.jsx');

    recursive(assets_path);
    recursive(error_pug_path);
    recursive(page_pug_path);

    const template_redux_file = fs.readFileSync(template_redux_path, { encoding: 'utf8' });

    fs.writeFileSync(root_redux_path, template_redux_file);

    const template_js_path = path.join(__dirname, '..', '..', '..', 'templates', 'newProject', 'utils', 'methods', 'renders.js');
    const template_js_string = fs.readFileSync(template_js_path, { encoding: 'utf8' });
    const root_util = path.join(root, 'utils', 'methods', 'renders.js');
    fs.writeFileSync(root_util, template_js_string);

    console.green(`Updated legacy code`);
};

const documentation = () => {
    console.yellow(`
Update for legacy versions for react with command:

Commands:
node-rails update-react-hot-reloading
    `);
};

module.exports = {
    command,
    description,
    documentation,
};
