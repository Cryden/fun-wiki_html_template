/**
 * Build font assets
 */

const {reload} = require('browser-sync');

exports.modules = fonts;

function fonts() {
  return gulp
    .src(path.join(config.source, 'fonts', '*'))
    .pipe(gulp.dest(path.join(config.build, 'fonts')))
    .pipe(reload({
      stream: true
    }))
}

gulp.task('fonts', fonts);
