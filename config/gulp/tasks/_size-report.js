/**
 * Size report
 */

const sizereport = require('gulp-sizereport');

function size() {
  return gulp
    .src(config.root.dist + '/**/*.{js,css}')
    .pipe(sizereport({
      gzip: true
    }))
}

gulp.task('size', size)
