module.exports = {
    context: __dirname + "/src",
    entry: {
        javascript: "./index.js",
        html: "./index.html"
    },

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
    }
}
