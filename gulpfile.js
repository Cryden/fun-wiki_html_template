const requireDir = require('require-dir');

global.path = require('path');
global.yargs = require('yargs').argv;
global.browserSync = require('browser-sync');
global.gulp = require('gulp');
global.plumber = require('gulp-plumber');
global.notify = require('gulp-notify');
global.runSequence = require('run-sequence');
global.config = require('./.config/gulp/config.json');

requireDir('./.config/gulp/tasks', {
  recurse: true
});
