import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '// Redux here';
import Application from './component';

import '// Route Path';

const render = (Component: React.FC, create: (data: any) => any) => {
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
		'// Redux here',
		'// Route Path',
	], () => {
		const newCreateStore = require('// Redux here');
		const NewComponent = require('./component');
		render(NewComponent, newCreateStore);
	});
}
