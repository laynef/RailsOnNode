import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

export default function (data) {
    // Sync dispatched route actions to the history
    const middleware = [thunk, ReduxPromise, createLogger()];

    const composeEnhancers = typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(data) : compose;

    const finalCreateStore = composeEnhancers(applyMiddleware(...middleware))(_createStore);

    const store = finalCreateStore(reducer, data);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const rootReducers = require('./reducers').default;
            store.replaceReducer(rootReducers);
        });
    }

    return store;
};
