/**
 * Build JS
 */

const webpack = require('webpack-stream');
const webpackConfig = require('./../../webpack/webpack.dist.js');

function js() {
  return gulp
    .src(path.join(config.source, 'js', 'main.js'))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(path.join(config.build, 'js')))
}

gulp.task('js', js);
