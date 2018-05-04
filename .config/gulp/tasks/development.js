/**
 * Development mode
 */

gulp.task('development', () => {
  gulp.run(['pug', 'sass', 'js', 'images', 'fonts'])
  gulp.run('watch')
});
