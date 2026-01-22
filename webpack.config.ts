const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;
const path = require('path');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.ts')
    },
    mode: 'development',
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
                  "sass-loader",
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
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './public/index.html'),
          favicon: './public/favicon.ico',
          manifest: './public/manifest.ico'
        }),
        new ModuleFederationPlugin({
            name: "Host",
            remotes: {
              remote: `Remote@http://localhost:4000/remoteEntry.js`,
            },
            shared: {
              ...dependencies,
              react: {
                singleton: true,
                eager: true,
                requiredVersion: dependencies.react,
              },
              "react-dom": {
                singleton: true,
                eager: true,
                requiredVersion: dependencies["react-dom"],
              },
              "react-router-dom": {
                singleton: true,
                eager: true,
                requiredVersion: dependencies["react-router-dom"],
              },
            },
          }),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
}
