import 'intersection-observer';
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '// Redux here';

// Route Path

class Application extends Component {
    render() {
        return (
            <h1 style={{ textAlign: 'center' }}>Hello World</h1>
        );
    };
}

const dest = document.getElementById('app');
const store = createStore(window.STORAGE);

const application = (
    <Provider store={store}>
        <Application></Application>
    </Provider>
);

ReactDOM.render(application, dest);

/* eslint-disable */
if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept([], () => {
		const newStore = createStore(window.STORAGE);

		const newApplication = (
			<Provider store={newStore}>
				<Application></Application>
			</Provider>
        );
        
		ReactDOM.render(newApplication, dest);
	});
}

module.exports = application;