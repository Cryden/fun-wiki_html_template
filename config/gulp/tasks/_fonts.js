/**
 * Build font assets
 */

const {reload} = require('browser-sync');

exports.modules = fonts;

function fonts() {
  return gulp
    .src(path.join(config.dev, config.fonts.dev, config.fonts.extensions))
    .pipe(gulp.dest(path.join(config.dist, config.fonts.dist)))
    .pipe(reload({
      stream: true
    }))
}

gulp.task('fonts', fonts);
