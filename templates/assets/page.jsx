import 'intersection-observer';
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from '// Redux here';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

// Route Path

class Application extends Component {
    render () {
        return (
            <h1 style={{ textAlign: 'center' }}>Hello World</h1>
        );
    };
}

const component = (
	<BrowserRouter>
		{renderRoutes([{ '// Route Url': Application }])}
	</BrowserRouter>
);

const dest = document.getElementById('app');
const store = createStore(window.STORAGE);

const application = (
    <Provider store={store}>
        {component}
    </Provider>
);

ReactDOM.render(application, dest);

/* eslint-disable */
if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept([], () => {
		const newStore = createStore(window.STORAGE);

		const newApplication = (
			<Provider store={newStore}>
				{component}
			</Provider>
        );
        
		ReactDOM.render(newApplication, dest);
	});
}

module.exports = Application;