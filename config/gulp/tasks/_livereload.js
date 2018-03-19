/**
 * Browser Sync & webpack middlewares
 */
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackConfig = require('./../../webpack/webpack.config');
const webpackCompiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function liveReload() {

  const browserSyncConfig = {
    logPrefix: config.app_name,
    port: config.browserSync.port,
  };

  if (config.browserSync.proxy.target) {
    browserSyncConfig.proxy = {
      target: config.browserSync.proxy.target,
    };
    browserSyncConfig.files = config.browserSync.proxy.files;
  } else {
    browserSyncConfig.server = {
      baseDir: config.root.dist,
    };
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
  ];

  browserSync.init(browserSyncConfig);
  gulp.watch(path.resolve(config.dev, config.js.dev, '*')).on('change', () => browserSync.reload())
}

gulp.task('livereload', liveReload);
