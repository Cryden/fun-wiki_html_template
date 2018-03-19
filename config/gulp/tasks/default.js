/**
 * Default Tasks
 */

const runSequence = require('run-sequence');

const assets = ['img', 'fonts', 'static'];

/**
 * Enable/Disable html build using config
 * Usually when we use proxy this task became unused
 */
if (config.html.run) {
  assets.push('pug');
}

gulp.task('default', (cb) => {
  yargs.production ? runSequence(assets, ['css', 'js'], 'size', cb) :
  yargs.build ? runSequence('clean', assets, ['css', 'js'], 'size', cb) :
  runSequence(assets, ['css'], 'watch', cb);
});
