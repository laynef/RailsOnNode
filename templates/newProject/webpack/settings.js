module.exports = {
    styleType: 'css',
    jsType: 'js',
    useBootstrapToggle: false,
    bootstrap: {
        scripts: {
            alert: true,
            button: true,
            carousel: true,
            collapse: true,
            dropdown: true,
            modal: true,
            popover: true,
            scrollspy: true,
            tab: true,
            tooltip: true,
            util: true,
        },
    },
    javascriptSettings: {
        test: '.js$',
        exclude: 'node_modules',
        use: ['babel-loader'],
    },
};
