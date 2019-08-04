import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '../../redux/store';
import Application from './component';

import '../../../css/pages/blogs/blogs';

const render = (Component, create) => {
	const dest = document.getElementById('app');
	const store = create(window.STORAGE || {});

	const application = (
        <Provider store={store} key={Math.random()}>
            <Component />
        </Provider>
	);

	ReactDOM.render(application, dest);
};

render(Application, createStore);

/* eslint-disable */
if (module.hot) {
	module.hot.accept([
		'./component',
		'../../redux/store',
		'../../../css/pages/blogs/blogs',
	], () => {
		const newCreateStore = require('../../redux/store');
		const NewComponent = require('./component');
		render(NewComponent, newCreateStore);
	});
}
