/* Serverside Imports */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import path from 'path';
import settings from '../../webpack/settings';
import { renderRoutes } from 'react-router-config';

import Vue from 'vue';
import { createRenderer } from 'vue-server-render';

module.exports = {

    /* Serverside Redux */
    serverSideReact: (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        req.session.redux = req.session.redux || require(path.join(assets, 'redux', 'store'))();
        let context = {};
        let userStore = req.session.redux;
        let route = {};
        let pathRoute = assets += '/pages' + req.url + '/' + pageName;
        route[req.url] = require(pathRoute);
		const component = (
			<Provider store={userStore}>
				<StaticRouter location={req.url} context={context}>
					{renderRoutes([route])}
				</StaticRouter>
			</Provider>
        );
        return {
            serversideString: renderToStaticMarkup(component),
            serversideStorage: req.session.redux
        };
    },

    serverSideAngular: () => {

    },

    serverSideVue: (pageName, req) => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        req.session.state = req.session.state || require(path.join(assets, 'redux', 'store'))();
        let pathRoute = assets += '/pages' + req.url + '/' + pageName;
        let context = {};
        const renderer = createRenderer();
        const vue = require(pathRoute);
        return renderer.renderToString(vue, context).then((html) => ({
            serversideStorage: req.session.state,
            serversideString: html,
        }));
    },

    serverSideJs: () => {
        const assets = path.join(__dirname, '..', '..', 'assets', settings.jsType);
        req.session.redux = req.session.redux || require(path.join(assets, 'redux', 'store'))();
        let route = {};
        let pathRoute = assets += '/pages' + req.url + '/' + pageName;
        route[req.url] = require(pathRoute);
        return {
            serversideStorage: req.session.redux
        };

    },

};
