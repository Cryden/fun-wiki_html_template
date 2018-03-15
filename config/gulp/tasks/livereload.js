/**
 * Browser Sync & webpack middlewares
 */
const browserSync = require('browser-sync');

const webpackConfig = require('./../../webpack/webpack.config');
const webpack = require('webpack')(webpackConfig);

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

  if (!yargs.production) {
    browserSyncConfig.middleware = [
      webpackDevMiddleware(webpack, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: true,
        stats: {
          colors: true,
        },
      }),
      webpackHotMiddleware(webpack),
    ];
  }

  browserSync.init(browserSyncConfig);
}

gulp.task('livereload', liveReload);
