const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =  {
  entry: [
    './source/js/main.js'
  ],
  output: {
    path: path.resolve(__dirname, 'docs/js'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            loaders: {
              sass: ExtractTextPlugin.extract({
                use: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                fallback: 'vue-style-loader'
              }),
              css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader'
              })
            }         
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    }
  },
	plugins: [
		new ExtractTextPlugin("./../../source/sass/components/_vue.scss")
	]
}