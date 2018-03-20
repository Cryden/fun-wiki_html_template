/**
 * Build image assets
 */

const { reload } = require('browser-sync');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');

function img() {
  return gulp
    .src(path.join(config.source, 'images', '*'))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Img Error",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(changed(path.join(config.build, 'images')))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ],
      use: [
        pngquant(),
      ],
    }))
    .pipe(gulp.dest(path.join(config.build, 'images')))
    .pipe(reload({ stream: true }))
}

gulp.task('images', img)
