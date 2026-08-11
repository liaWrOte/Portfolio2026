const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dependencies = require("./package.json").dependencies;
const path = require('path');

module.exports = (env: any, argv: any) => ({
    entry: {
        index: path.resolve(__dirname, './src/index.ts')
    },
    mode: argv?.mode || 'development',
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 3000,
      historyApiFallback: true,
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        // publicPath: path.resolve(__dirname, './build'),
    },
    module:{
        rules:[
            {
                loader: 'babel-loader',
                test: /\.js$|jsx$|ts$|tsx/,
                exclude: /node_modules/,
                options: { presets: ['@babel/env', '@babel/preset-react', '@babel/preset-typescript'] },
            },
            // Images
            {
                test: /\.(ico|gif|png|jpe?g|webp|svg)$/i,
                use: [
                {
                    loader: 'file-loader',
                    options: { outputPath: 'images/' },
                },
                ],
            },
            // SCSS
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  {
                    loader: "sass-loader",
                    options: {
                      api: "modern",
                    },
                  },
                ],
              },
            // mp3
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL || ''),
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './public/index.html'),
          favicon: './public/favicon.svg',
          manifest: './public/manifest.ico'
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: 'public',
                to: '.',
                globOptions: { ignore: ['**/index.html'] },
              },
            ],
          }),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
});
