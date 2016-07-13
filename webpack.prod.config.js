const webpack = require("webpack")

module.exports = {
    context: __dirname + "/src",
    entry: {
        javascript: "./index.js",
        html: "./index.html"
    },

    devtool: "cheap-module-source-map",

    output: {
        filename: "app.js",
        path: __dirname + "/dist",
    },

    module: {
        loaders: [
            { 
                test:  /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
