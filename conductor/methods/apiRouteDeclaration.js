const asyncHandler = require('express-async-handler');


const setMiddleware = (middlewares) => {
    if (Array.isArray(middlewares) && middlewares.length > 0) {
        return middlewares.map(el => {
            const [middleware] = Object.values(el);
            return asyncHandler(middleware);
        });
    } else {
        return [(req, res, next) => { next(); }];
    }
};

const getMiddleware = (middlewares) => {
    if (Array.isArray(middlewares) && middlewares.length > 0) {
        return middlewares.map(el => {
            const [name] = Object.keys(el);
            return name;
        });
    } else {
        return ['No middleware'];
    }
};

const setMethodRoutes = (method, _router, routes) => {
    routes.forEach(e => {
        _router[method](e.route, ...setMiddleware(e.middleware || []), asyncHandler(e.controller));
    });
    return _router;
};

const setGetRoutes = (_router, routes) => setMethodRoutes('get', _router, routes);
const setPostRoutes = (_router, routes) => setMethodRoutes('post', _router, routes);
const setPatchRoutes = (_router, routes) => setMethodRoutes('patch', _router, routes);
const setPutRoutes = (_router, routes) => setMethodRoutes('put', _router, routes);
const setDeleteRoutes = (_router, routes) => setMethodRoutes('delete', _router, routes);

const setAsyncRoutes = (_router, config = { gets, posts, patchs, puts, deletes }) => {
    _router = setGetRoutes(_router, config.gets || []);
    _router = setPostRoutes(_router, config.posts || []);
    _router = setPatchRoutes(_router, config.patchs || []);
    _router = setPutRoutes(_router, config.puts || []);
    _router = setDeleteRoutes(_router, config.deletes || []);
    return _router;
};

const getDocumentationForRouter = (apiVersion, config = { gets, posts, patchs, puts, deletes }) => []
    .concat((config.gets || []).map(e => ({...e, method: 'GET'})))
    .concat((config.posts || []).map(e => ({...e, method: 'POST'})))
    .concat((config.patchs || []).map(e => ({...e, method: 'PATCH'})))
    .concat((config.puts || []).map(e => ({...e, method: 'PUT'})))
    .concat((config.deletes || []).map(e => ({...e, method: 'DELETE'})))
    .filter(e => !e.ignore)
    .map(e => ({ ...e, route: `/api/${apiVersion}${e.route}`, middleware: getMiddleware(e.middleware) }));

const getApiVersion = (directoryPath) => `${directoryPath}`.split('/').pop();

const returnRouter = ({ apiVersion, documentation, router }) => ({
    [apiVersion]: documentation,
    [`${apiVersion}Router`]: router,
});

module.exports = {
    getApiVersion,
    getDocumentationForRouter,
    setAsyncRoutes,
    returnRouter,
};
