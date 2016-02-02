var path = require('path');
var config = {
    entry: path.resolve(__dirname, 'app/main.jsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        }, {
            test: /\.(woff)|(woff2)|(eot)|(svg)|(ttf)$/,
            loader: 'url?limit=100000'
        }]
    }
};

module.exports = config;