const path = require("path");
const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "vue-ricochet.min.js",
        library: "VueRicochet",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    resolve: {
        alias: {
            'vue': '@vue/runtime-dom'
        },
        extensions: ["*", ".js", ".vue", ".json"],
    },
    mode: "production",
}
