require('dotenv').config();
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '// Redux here';
import Application from './component';

// Route Path

const dest = document.getElementById('app');
const store = createStore(window.STORAGE);

const application = (
    <Provider store={store}>
        <Application />
    </Provider>
);

ReactDOM.render(application, dest);

/* eslint-disable */
if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept([], () => {
		const newStore = createStore(window.STORAGE);

		const newApplication = (
			<Provider store={newStore}>
				<Application />
			</Provider>
        );
        
		ReactDOM.render(newApplication, dest);
	});
}