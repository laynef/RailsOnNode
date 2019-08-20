const fs = require('fs');
const path = require('path');


module.exports = (settings) => () => {
    const babelrc = JSON.parse(fs.readFileSync(path.join(settings.context, '.babelrc')))
    require('babel-register')(babelrc);
    const React = require('react');
    const { Provider } = require('react-redux');
    const { renderToStaticMarkup } = require('react-dom/server');

    return (Component, store) => renderToStaticMarkup(
        React.createElement(Provider, { store }, React.createElement(Component))
    );
};
