/**
 * Build static assets: video, favicons ...
 */

const { reload } = require('browser-sync');

function static() {
  return gulp
    .src(path.join(config.dev, config.static.dev, '**/*'))
    .pipe(gulp.dest(path.join(config.dist, config.static.dist)))
    .pipe(reload({ stream: true }))
}

gulp.task('static', static);
