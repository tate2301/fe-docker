const path = require('path');

module.exports = {
    entry: './react/src/js/app.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components|\.spec\.js$)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['transform-class-properties', 'transform-object-rest-spread'],
                    },
                },
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components|\.spec\.js$)/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    failOnError: true,
                    fix: true,
                },
            },
        ],
    },
    devtool: 'eval-source-map',
};
