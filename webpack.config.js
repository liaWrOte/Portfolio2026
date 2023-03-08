const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/App.js')
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                loader: 'babel-loader',
                test: /\.js$|jsx/,
                exclude: /node_modules/,
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './public/index.html'),
        }),
    ],
    // resolve: {
    //     extensions: [".js", ".jsx"]
    // }
}

// module.exports = {
//     webpackFinal: async (config, { configType }) => {
//         // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
//         // You can change the configuration based on that.
//         // 'PRODUCTION' is used when building the static version of storybook.
    
//         // Make whatever fine-grained changes you need
//         config.module.rules.push({
//           test: /\.scss$/,
//           use: ['style-loader', 'css-loader', 'sass-loader'],
//           include: path.resolve(__dirname, './build'),
//         });
    
//         // Return the altered config
//         return config;
//       },
// }