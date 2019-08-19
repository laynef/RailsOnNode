const fs = require('fs');
const path = require('path');


const handleServerSide = (settings) => {
    const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')))
    require('babel-register')(babelrc);
    return require('../babel')(settings)(settings);
}

const serverSideOptions = {

        js: {
            serverSide: async (pageName, req) => {
                const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')))
                require('babel-register')(babelrc);
                const assets = path.join(settings.context, 'assets', settings.jsType, 'storage', 'store');
                const store = require(assets);
                try {
                    let storage = await global.redis.getAsync(req.session.id);
                    storage = JSON.parse(storage);
                    return { serversideStorage: JSON.stringify(store(storage)) };
                } catch (e) {
                    return { serversideStorage: JSON.stringify(store({})) };
                }
            },

            getFreshStore: (req) => {
                const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')))
                require('babel-register')(babelrc);
                const assets = path.join(settings.context, 'assets', settings.jsType);
                const store = require(path.join(assets, 'storage', 'store'))({});
                const storage = store.getState();
                global.redis.set(req.session.id, JSON.stringify(storage));
                return storage;
            },
        },

        jsx: {
            serverSide: async (pageName, req) => {
                const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')))
                require('babel-register')(babelrc);
                const assets = path.join(settings.context, 'assets', settings.jsType);
                const createStore = require(path.join(assets, 'redux', 'store'));
                const componentArray = pageName.split('/');
                componentArray.pop();
                const componentPath = componentArray.join('/') + '/component';

                const Application = require(path.join(assets, componentPath));
                const getServersideString = handleServerSide(settings)();

                try {
                    let redux = await global.redis.getAsync(req.session.id);
                    redux = !!redux ? JSON.parse(redux) : {};
                    const store = createStore(redux);
                    redux = redux || store.getState();

                    return {
                        serversideStorage: JSON.stringify(redux),
                        serversideString: getServersideString(Application, store),
                    };
                } catch (e) {
                    const store = createStore({});
                    return {
                        serversideStorage: JSON.stringify({}),
                        serversideString: getServersideString(Application, store),
                    };
                }
            },

            getFreshStore: (req) => {
                const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')))
                require('babel-register')(babelrc);
                const assets = path.join(settings.context, 'assets', settings.jsType);
                const createStore = require(path.join(assets, 'redux', 'store'));
                const store = createStore({});
                const storage = store.getState();
                global.redis.set(req.session.id, JSON.stringify(storage));
                return storage;
            }
        },

        vue: {

            serverSide: async (pageName, req) => {
                const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')));
                require('babel-register')(babelrc);
                const assets = path.join(settings.context, 'assets', settings.jsType);
                const store = require(path.join(assets, 'state', 'store'));
                const getServersideString = handleServerSide(settings)();

                const assetPath = path.join(assets, pageName);
                const fileArray = assetPath.split('/');
                fileArray.pop();
                const filePath = fileArray.join('/') + '/component.vue';

                try {
                    let state = await global.redis.getAsync(req.session.id);
                    state = !!state ? JSON.parse(state) : store();
                    const serversideString = await getServersideString(filePath, state);

                    return {
                        serversideStorage: JSON.stringify(state),
                        serversideString: serversideString,
                    }
                } catch(e) {
                    return {
                        serversideStorage: JSON.stringify({}),
                        serversideString: '',
                    }
                }
            },

            getFreshStore: (req) => {
                const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')))
                require('babel-register')(babelrc);
                const assets = path.join(settings.context, 'assets', settings.jsType);
                const createStore = require(path.join(assets, 'state', 'store'));
                const store = createStore({});
                global.redis.set(req.session.id, store);
                return store;
            }

        }
};

module.exports = {

    handleServerSide,

    renderServerSide: (settings) => serverSideOptions[settings.jsType],

};

