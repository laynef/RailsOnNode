import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '// Redux here';
import Application from './component';

import '// Route Path';

const dest = document.getElementById('app');
const store = createStore(window.STORAGE || {});

const application = (
    <Provider store={store}>
		<Application />
    </Provider>
);

ReactDOM.render(application, dest);

/* eslint-disable */
if (module.hot) {
	module.hot.accept([
		'./component',
		'// Redux here',
		'// Route Path',
	], () => {
		const newStore = createStore(window.STORAGE || {});

		const newApplication = (
			<Provider store={newStore}>
				<Application />
			</Provider>
        );

		ReactDOM.render(newApplication, dest);
	});
}
