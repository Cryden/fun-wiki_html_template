/**
 * Build image assets
 */

const { reload } = require('browser-sync');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');

function img() {
  return gulp
    .src(path.join(config.root.dev, config.img.dev, config.img.extensions))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Img Error",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(changed(path.join(config.root.dist, config.img.dist)))
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
    .pipe(gulp.dest(path.join(config.root.dist, config.img.dist)))
    .pipe(reload({ stream: true }))
}

gulp.task('img', img)
