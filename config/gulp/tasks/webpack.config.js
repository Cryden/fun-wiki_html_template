const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = require('./config');
const yargs = require('yargs').argv

const JS_DEV = path.resolve(config.root.dev, config.js.dev);
const JS_DIST = path.resolve(config.root.dist, config.js.dist);
const publicPath = path.join(config.root.dist, config.js.dist);

const webpackConfig = {
  context: JS_DEV,
  entry: {
    app: [
      './main.js',
    ],
  },
  output: {
    path: JS_DIST,
    filename: 'main.js',
    publicPath,
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
    },
    modules: [
      JS_DEV,
      'node_modules',
      'bower_components',
    ],
    extensions: config.js.extensions,
  },
  plugins: [
		new ExtractTextPlugin("./../../source/sass/components/_vue.scss")
	]
};

/**
 * Modify webpackConfig depends on mode
 */
if (yargs.production) {
  webpackConfig.plugins.push(
    new UglifyJsPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  webpackConfig.devtool = 'inline-source-map';
  webpackConfig.entry.app.unshift('webpack-hot-middleware/client?reload=true');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig;
