/**
 * Browser Sync & webpack middlewares
 */

const webpack = require('webpack')
const webpackConfig = require('./../../webpack/webpack.config')
const webpackCompiler = webpack(webpackConfig)
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const browserSyncConfig = {}

function liveReload() {

  browserSyncConfig.server = {
    baseDir: config.build
  }

  browserSyncConfig.middleware = [
    webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      noInfo: true,
      stats: {
        colors: true,
      },
    }),
    webpackHotMiddleware(webpackCompiler),
  ]

  browserSync.init(browserSyncConfig)

  gulp.watch(path.resolve(config.source, 'js', '*')).on('change', () => browserSync.reload())
}

gulp.task('browser-sync', liveReload);
