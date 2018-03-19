/**
 * Release mode
 */

gulp.task('release', (cb) => {
  runSequence('build', cb);
});
