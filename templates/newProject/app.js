require('dotenv').config();
const Express = require('express');
const { decorateApp } = require('@awaitjs/express');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const favicon = require('serve-favicon');
const csrf = require('csurf');
const parser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const {
    render,
    makeHash,
    documentation,
    updateDocs,
    renderError,
} = require('./utils');
const { docs } = require('./controllers');
const routeVersions = require('./routes');
const { each } = require('lodash');
const meta = require('./app.json');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const protection = csrf();
const app = decorateApp(new Express());

global.client = client;
app.set('trust proxy', 1);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', Express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression({ level: 7 }));
app.use(session({
    secret: fs.readFileSync(path.join(__dirname, 'openssl', 'web-secret.pem'), { encoding: 'utf8' }),
    store: new RedisStore({ client: client, disableTTL: true }),
    saveUninitialized: true,
    resave: false,
    name: meta.title,
    cookie: {
        token: null,
    },
}));

if (!process.env.TESTING) {
    app.use(protection);
    app.use((req, res, next) => {
        req.session.cookie.token = req.csrfToken();
        res.locals.csrfToken = req.csrfToken();
        next();
    });
}

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(parser.raw());
app.use(favicon(path.join(__dirname, 'assets', 'img', 'nodejs.png')));

if (!process.env.TESTING && process.env.NODE_ENV !== 'production') {
    const webpackConfig = require('./webpack/client.config');
    const compiler = require('webpack')(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        serverSideRender: true,
        quiet: true,
        lazy: false,
        logLevel: 'error',
        contentBase: path.join(__dirname, 'assets', 'dist', 'pages'),
        stats: {
            context: path.join(__dirname, 'assets', 'dist', 'pages'),
            assets: true,
            cachedAssets: true,
        },
    }));
    app.use(require('webpack-hot-middleware')(compiler, {
        path: '/__webpack_hmr',
        dynamicPublicPath: webpackConfig.output.publicPath,
        heartbeat: 10 * 1000,
        timeout: 20 * 1000,
    }));
}

each(routeVersions, (versionDetails, apiVersion) => {
    const allRoutes = versionDetails[apiVersion];
    if (process.env.NODE_ENV !== 'production') documentation({ allRoutes, apiVersion });
    if (process.env.NODE_ENV !== 'production') updateDocs(apiVersion);
    if (process.env.NODE_ENV !== 'production') app.get(`/docs/${apiVersion}`, docs({ apiVersion, allRoutes }));
    app.use(`/api/${apiVersion}`, versionDetails[`${apiVersion}Router`]);
});

app.getAsync('/', render('pages/index', { hashId: makeHash(40) }));
// Leave Here For Static Routes

app.use('*', (req, res) => {
    renderError(req, res, 'errors/404', { hashId: makeHash(40), statusCode: 404, environment: process.env.NODE_ENV, title: '404: Page Not Found' });
});

app.use((error, req, res, next) => {
    if (error) {
        console.error(error);
        renderError(req, res, 'errors/500', { hashId: makeHash(40), statusCode: 500, environment: process.env.NODE_ENV, title: '500: Internal Server Error' });
    }
    next();
});

module.exports = app;
