/**
 * Production mode
 */

 gulp.task('production', (cb) => {
  runSequence('build', cb);
});
