require('dotenv').config();
const Express = require('express');
const { decorateApp } = require('@awaitjs/express');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');
const compression = require('compression');
const favicon = require('serve-favicon');
const sqlinjection = require('sql-injection');
const csrf = require('csurf');
const parser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const {
    render,
    documentation,
    updateDocs,
    renderError,
    documentationRoutes,
} = require('rails-on-node-conductor');
const routeVersions = require('./routes');
const { each } = require('lodash');
const meta = require('../config/metatags.json');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const environment = process.env.NODE_ENV || 'development';
const logFile = path.join(__dirname, '..', 'log', environment + '.log');
const protection = csrf();
const app = decorateApp(new Express());

global.redis = client;
app.set('trust proxy', 1);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: logFile })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} -- {{res.responseTime}}ms",
    expressFormat: true,
    colorize: true,
    ignoreRoute: function (req, res) { return false; }
}));
app.use(cors());
app.use(helmet());
app.use(sqlinjection);
app.use(morgan('dev'));
app.use(compression({ level: 7 }));
app.use(session({
    secret: fs.readFileSync(path.join(__dirname, '..', 'config', 'openssl', 'web-secret.pem'), { encoding: 'utf8' }),
    store: new RedisStore({ client: client, disableTTL: true }),
    saveUninitialized: true,
    resave: false,
    name: meta.title,
    cookie: {
        token: null,
    },
}));
app.use('/assets', Express.static(path.join(__dirname, 'assets')));
app.use('/', Express.static(path.join(__dirname, 'assets', 'dist')));

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
    const webpackConfig = require('../config/webpack/client.config');
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
    const generateDocumentationJS = documentation(global.settings);
    if (process.env.NODE_ENV !== 'production') generateDocumentationJS({ allRoutes, apiVersion });
    if (process.env.NODE_ENV !== 'production') updateDocs(apiVersion);
    if (process.env.NODE_ENV !== 'production') app.get(`/docs/${apiVersion}`, documentationRoutes({ apiVersion, allRoutes }));
    app.use(`/api/${apiVersion}`, versionDetails[`${apiVersion}Router`]);
});

app.getAsync('/', render('pages/index', { hashId: global.hashId }));
// Leave Here For Static Routes

app.use('*', (req, res) => {
    renderError(req, res, 'errors/404', { hashId: global.hashId, statusCode: 404, environment: process.env.NODE_ENV, title: '404: Page Not Found' });
});

app.use((error, req, res, next) => {
    if (error) {
        renderError(req, res, 'errors/500', { hashId: global.hashId, statusCode: 500, environment: process.env.NODE_ENV, title: '500: Internal Server Error' });
    }
    next();
});

module.exports = app;
