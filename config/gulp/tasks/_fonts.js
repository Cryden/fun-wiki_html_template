/**
 * Build font assets
 */

const {reload} = require('browser-sync');

exports.modules = fonts;

function fonts() {
  return gulp
    .src(path.join(config.root.dev, config.fonts.dev, config.fonts.extensions))
    .pipe(gulp.dest(path.join(config.root.dist, config.fonts.dist)))
    .pipe(reload({
      stream: true
    }))
}

gulp.task('fonts', fonts);
