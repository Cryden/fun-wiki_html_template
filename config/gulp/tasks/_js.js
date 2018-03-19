/**
 * Build JS
 */

const { reload } = require('browser-sync');
const webpack = require('webpack-stream');
const webpackConfig = require('./../../webpack/webpack.config');

function js() {
  return gulp.src(path.join(config.dev, config.js.dev, 'main.js'))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "JS Error",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(path.join(config.dist, config.js.dist)))
    .pipe(browserSync.reload())
}

gulp.task('js', js);
