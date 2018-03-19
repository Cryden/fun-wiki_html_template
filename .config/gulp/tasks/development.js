/**
 * Development mode
 */

gulp.task('development', (cb) => {
  runSequence('pug', 'css', 'img', 'fonts', 'watch', cb);
});
