const React = require('react');
const { Provider } = require('react-redux');
const { renderToStaticMarkup } = require('react-dom/server');

module.exports = (Component, store) => {
    return renderToStaticMarkup(
        <Provider store={store}>
            <Component />
        </Provider>
    );
}
            