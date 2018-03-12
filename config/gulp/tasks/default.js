/**
 * Default Tasks
 */
const gulp = require('gulp');
const runSequence = require('run-sequence');
const yargs = require("yargs").argv

const config = require('./config');

const assets = ['img', 'fonts', 'static'];

gulp.task('default', (cb) => {
  yargs.production
    ? runSequence('clean', assets, 'pug', ['css', 'js'], 'size', cb)
    : runSequence(assets, 'pug', 'css', cb);
});
