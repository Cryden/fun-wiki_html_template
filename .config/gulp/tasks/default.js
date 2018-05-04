/**
 * Default Tasks
 */

gulp.task('default', () => {
  if (yargs.production) {
    gulp.run('production')
  }
  if (yargs.release) {
    gulp.run('release')
  }
    gulp.run('development')
})
