/**
 * Default Tasks
 */

gulp.task('default', (cb) => {
  yargs.production ? runSequence('production', cb) :
  yargs.release ? runSequence('release', cb) :
  runSequence('development', cb);
});


