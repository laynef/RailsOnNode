module.exports = ({ file, options, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false, // Handles `.css` && '.sss' files dynamically
    plugins: {
        'postcss-preset-env': {},
        'autoprefixer': {},
        'postcss-import': {},
        'cssnano': env === 'production' ? {} : false,
    },
});
