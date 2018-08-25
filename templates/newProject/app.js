const Express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const favicon = require('serve-favicon');
const csrf = require('csurf');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient('redis://localhost:6379');
const { globalRenders, makeHash, documentation, serverSide } = require('./utils');
const { docs } = require('./controllers');
const routeVersions = require('./routes');
const { each } = require('lodash');

const protection = csrf();
const app = new Express();

app.set('trust proxy', 1);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', Express.static(path.join(__dirname, 'assets')));
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(favicon(path.join(__dirname, 'assets', 'img', 'nodejs.png')));
app.use(session({
    secret: fs.readFileSync(path.join(__dirname, 'openssl', 'web-secret.pem'), { encoding: 'utf8' }),
    store: new RedisStore({ client: client, disableTTL: true }),
    saveUninitialized: true,
    resave: false,
    name: 'Example',
    cookie: {
        secure: true,
        httpOnly: true,
        token: null,
    },
}));
app.use(protection);
app.use((req, res, next) => {
    req.session.cookie.token = req.csrfToken();
    res.locals.csrftoken = req.csrfToken();
    next();
});

each(routeVersions, (versionDetails, apiVersion) => {
    const allRoutes = versionDetails[apiVersion];
    documentation({ allRoutes, apiVersion });
    app.get(`/docs/${apiVersion}`, docs({ apiVersion, allRoutes }));
    app.use(`/api/${apiVersion}`, versionDetails[`${apiVersion}Router`]);
});

// Static Pages
const render = (pageName, customObject = {}) => (req, res) => {
    res.status(200).render(pageName, globalRenders(pageName, req, res, Object.assign({}, customObject, serverSide(req))));
};

if (process.env.NODE_ENV !== 'production') {
    const webpackConfig = require('./webpack/client.config');
    const compiler = require('webpack')(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        serverSideRender: true,
        quiet: true,
        lazy: false,
        contentBase: path.join(__dirname, '..', 'assets', 'dist'),
        stats: {
            context: path.join(__dirname, '..', 'assets', 'dist'),
            assets: true,
            cachedAssets: true,
        },
    }));
    app.use(require('webpack-hot-middleware')(compiler, {
        path: '/__webpack_hmr',
        dynamicPublicPath: webpackConfig.output.publicPath,
        heartbeat: 10 * 1000,
        timeout: 20 * 1000,
        reload: true,
    }));
}

app.get('/', render('pages/index', { hashId: makeHash(40) }));
// Leave Here For Static Routes

app.use('*', (req, res) => {
    res.status(404).render('errors/404', { hashId: makeHash(40) });
});

app.use((error, req, res, next) => {
    if (error) {
        console.error(error);
        res.status(500).render('errors/500', { hashId: makeHash(40) });
    }
    next();
});

const server = http.createServer(app);
const httpPort = process.env.PORT || 8080;
server.listen(httpPort, () => {
    console.log(`Running on port ${httpPort}`);
});
