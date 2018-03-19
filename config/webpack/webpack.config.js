const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//console.log(path.resolve(config.dev, config.js.dev, 'main.js'));
//console.log(path.resolve(config.dist, config.js.dist));

const publicPath = config.browserSync.proxy.target
  ? config.browserSync.proxy.publicPath
  : path.resolve(config.dist, config.js.dist);

const webpackConfig =  {
  entry: {
    app: [
      path.resolve(config.dev, config.js.dev, 'main.js'),
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ],
  },
  output: {
    path: path.resolve(config.dist, config.js.dist),
    filename: 'main.js',
    publicPath
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
		new ExtractTextPlugin("./../../source/sass/components/_vue.scss"),
	]
}

if (yargs.production) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  webpackConfig.devtool = 'inline-source-map';
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig
