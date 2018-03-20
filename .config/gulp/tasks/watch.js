/**
 * WATCHER
 */

const watch = require('gulp-watch')

gulp.task('watch', ['browser-sync'], () => {
  const folders = ['sass', 'images', 'fonts', 'pug'];

  folders.forEach((task) => {
    watch(path.resolve(config.source, task), () => {
      gulp.start(task);
    })
  })
})
