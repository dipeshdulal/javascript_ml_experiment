const path = require('path');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname),
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: false,
        port: 8000
    }
}