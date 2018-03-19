/**
 * Build HTML
 */

const pug = require('gulp-pug');
const htmlbeautify = require('gulp-html-beautify');

function render_pug() {
  return gulp
    .src(path.resolve(config.source, 'pug', '*.pug'))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Pug Error",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(pug())
    .pipe(htmlbeautify())
    .pipe(gulp.dest(path.resolve(config.build)))
    .pipe(browserSync.reload({ stream: true }))
}

gulp.task('pug', render_pug);
