const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const target = process.env.TARGET || 'sync';
module.exports = {
    entry: {
        bundle: __dirname + `/src/views/${target}.js`,
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist/build',
        filename: '[name].js'
    },
    devServer: {
    static: {
        directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
        writeToDisk: true,
    },
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true,
},
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', "@babel/plugin-transform-runtime"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    externals: {
    }
}