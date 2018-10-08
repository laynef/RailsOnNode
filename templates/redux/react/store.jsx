import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

export default function (data) {
    // Sync dispatched route actions to the history
    const middleware = [thunk, ReduxPromise, createLogger()];

    let finalCreateStore = compose(applyMiddleware(...middleware))(_createStore);

    const store = finalCreateStore(reducer, data);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducer);
        });
    }

    return store;
};
