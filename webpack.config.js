var webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    devtool: "sourcemap",
    output: {
        path: __dirname + "/dist",
        filename: "app.js"
    },
    eslint: {
        configFile: './.eslintrc'
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets: ["es2015"]
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }]
    }
};
