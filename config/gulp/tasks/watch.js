/**
 * WATCHER
 */

const watch = require('gulp-watch');

gulp.task('watch', () => {
  const folders = ['css', 'img', 'static', 'fonts', 'js'];

  folders.forEach((task) => {
    //watch(path.resolve(config.root.dev, config[task].dev), () => {
      //gulp.start(task);
      console.log(config[task].dev)
    //});
  });
});
