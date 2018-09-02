require('babel-register');
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const routes = require('../routes');
const { render, makeHash } = require('../utils');
const views = require('./routes.json');

process.env.TESTING = true;

let viewRoutes = views.map(pageName => {
    const routeArray = pageName.split('/');
    routeArray[0] = '';
    routeArray[routeArray.length - 1] = '';
    const route = routeArray.join('/')
    return {
        middleware: [],
        route: route,
        controller: render(pageName, { hashId: makeHash(40) }),
        method: 'GET',
        description: 'View Route Testing'
    }
});

const customCircle = fs.readdirSync(path.join(__dirname, 'custom')).reduce((acc, item) => {
    if (item !== '.gitkeep') {
        acc[item] = require(path.join(__dirname, 'custom', item));
    }
    return acc;
}, {});

// mocha should catch on and can be different
for (let customTests in customCircle) {
    customCircle[customTests];
}

for (let apiVersion in routes) {
    const val = routes[`${apiVersion}`];
    for (let values in val) {
        const allRoutes = val[values];
        if (Array.isArray(allRoutes)) {
            viewRoutes = viewRoutes.concat(allRoutes).filter(e => !e.ignore);
        }
    }
}

viewRoutes.forEach(route => {

    const tests = {
        'GET': (app, route, status, done) => {
            return request(app)
                .get(route)
                .expect(status)
                .end(function(err, res) {
                    if (err) return done(err);
                    else return done(res);
                });
        },
        'POST': (app, route, status, done) => {
            return request(app)
                .post(route)
                .expect(status)
                .end(function(err, res) {
                    if (err) return done(err);
                    else return done(res);
                });
        },
        'PATCH': (app, route, status, done) => {
            return request(app)
                .patch(route)
                .expect(status)
                .end(function(err, res) {
                    if (err) return done(err);
                    else return done(res);
                });
        },
        'PUT': (app, route, status, done) => {
            return request(app)
                .put(route)
                .expect(status)
                .end(function(err, res) {
                    if (err) return done(err);
                    else return done(res);
                });
        },
        'DELETE': (app, route, status, done) => {
            return request(app)
                .delete(route)
                .expect(status)
                .end(function(err, res) {
                    if (err) return done(err);
                    else return done(res);
                });
        },
    }

    const status = route.method === 'POST' ? 201 :
    route.method === 'PATCH' ? 202 :
    route.method === 'PUT' ? 202 :
    route.method === 'DELETE' ? 203 : 200;

    const paramReplacements = {
        ':id': 1,
    }

    const testRoute = route.route.split('/').map(e => {
        return paramReplacements[e] ? paramReplacements[e] : e;
    }).join('/');

    describe(`Testing Server Calls`, (done) => {
        const response = tests[route.method](app, testRoute, status, done);
        it(`Server call was successful`, () => {
            expect(typeof response === 'object').to.be.true;
        });
    });

});