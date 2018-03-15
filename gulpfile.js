const requireDir = require('require-dir');

global.gulp = require('gulp');
global.path = require('path');
global.config = require ('./config/gulp/config.json');
global.yargs = require('yargs').argv;
global.plumber = require('gulp-plumber');
global.notify = require('gulp-notify');

requireDir('./config/gulp/tasks', { recurse: true });