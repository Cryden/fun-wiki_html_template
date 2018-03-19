/**
 * Build HTML
 */

const { reload } = require('browser-sync');
const pug = require('gulp-pug');
const htmlbeautify = require('gulp-html-beautify');

function html() {
  return gulp
    .src(path.join(config.dev, config.html.dev, '*.pug'))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Pug Error",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(pug())
    .pipe(htmlbeautify())
    .pipe(gulp.dest(path.join(config.dist, config.html.dist)))
    .pipe(reload({ stream: true }))
}

gulp.task('pug', html);
