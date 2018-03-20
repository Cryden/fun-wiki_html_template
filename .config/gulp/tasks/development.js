/**
 * Development mode
 */

gulp.task('development', (cb) => {
  runSequence('pug', 'sass', 'images', 'fonts', 'watch', cb);
});
