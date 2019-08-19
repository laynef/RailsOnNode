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
    documentation,
    updateDocs,
    documentationRoutes,
} = require('rails-on-node-conductor');
const routeVersions = require('./routes');
const { each } = require('lodash');
const meta = require('./app.json');

const protection = csrf();
const app = decorateApp(new Express());

app.set('trust proxy', 1);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
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

each(routeVersions, (versionDetails, apiVersion) => {
    const allRoutes = versionDetails[apiVersion];
    const generateDocumentationJS = documentation(global.settings);
    if (process.env.NODE_ENV !== 'production') generateDocumentationJS({ allRoutes, apiVersion });
    if (process.env.NODE_ENV !== 'production') updateDocs(apiVersion);
    if (process.env.NODE_ENV !== 'production') app.get(`/docs/${apiVersion}`, documentationRoutes({ apiVersion, allRoutes }));
    app.use(`/api/${apiVersion}`, versionDetails[`${apiVersion}Router`]);
});

app.getAsync('/', (req, res) => { res.status(200).json({ hello: 'world' }); });
// Leave Here For Static Routes

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({ error });
    }
    next();
});

module.exports = app;
