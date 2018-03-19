/**
 * WATCHER
 */

const watch = require('gulp-watch');

gulp.task('watch', ['livereload'], () => {
  const folders = ['css', 'img', 'fonts'];

  folders.forEach((task) => {
    watch(path.resolve(config.root.dev, config[task].dev), () => {
      gulp.start(task);
      console.log(config[task].dev)
    });
  });
});
