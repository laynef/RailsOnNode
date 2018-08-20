import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import './real-path';

const redux = /* CLI: Redux */;
window.STORE = redux;

const dest = document.getElementById('app');
const store = createStore(window.STORE);

class Application extends Component {
	render() {
		return (
			<h1 style="text-align: center;">Hello World</h1>
		);
	}
}

const route = /* CLI: Route Path */;

const routes = renderRoutes([
	{ [route]: Application },
]);

const component = (
	<BrowserRouter>
		{routes}
	</BrowserRouter>
);

const application = (
	<Provider store={store}>
		{component}
	</Provider>
);

ReactDOM.render(application, dest);

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept([store], () => {
		const newStore = createStore(window.STORE);

		const newComponent = (
			<BrowserRouter>
				{routes}
			</BrowserRouter>
		);

		const newApplication = (
			<Provider store={newStore}>
				{newComponent}
			</Provider>
		);

		ReactDOM.render(newApplication, dest);
	});
}
