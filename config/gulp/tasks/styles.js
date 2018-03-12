/**
 * Build CSS
 */
const gulp = require('gulp');
const { reload } = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const glob = require('glob');
const gulpif = require('gulp-if');
const minify = require('gulp-clean-css');
const notify = require('gulp-notify');
const path = require('path');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uncss = require('gulp-uncss');
const groupmedia = require('gulp-group-css-media-queries');

const config = require('./config');
const yargs = require('yargs').argv

// Configiration for gulp-uncss plugin.
const unCssIgnore = [
  /(#|\.)fancybox(-[a-zA-Z]+)?/,
  /tooltip/,
  '.modal',
  '.panel',
  '.active',
  '.hide',
  '.show',
  '.fade',
  '.fade.in',
  '.collapse',
  '.collapse.in',
  '.navbar-collapse',
  '.navbar-collapse.in',
  '.collapsing',
];

gulp.task('css', () =>
  gulp
    .src(path.join(config.root.dev, config.css.dev, '**/*.{scss,sass}'))
    .pipe(gulpif(!yargs.production, sourcemaps.init()))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sass({
      includePaths: ['./node_modules', './bower_components'],
      outputStyle: 'expanded',
      sourceMap: true,
      errLogToConsole: true,
    }))

    /**
     * You can use this feature if you have a lot of vendor css/scss libs.
     * The main problem with this plugin - finding selector in js file.
     * Use unCssIgnore to prevent removing some classes/ids.
     * If you have some solution - make pull request/open issue.
     */

    .pipe(gulpif(
      config.css.uncss,
      uncss({
        html: path.join(config.root.dist, '*.html'),
        ignore: unCssIgnore,
      })
    ))

    .pipe(autoprefixer({
      browsers: ['last 3 version'],
    }))

    .pipe(groupmedia())

    .pipe(gulpif(
      yargs.production,
      minify({
        keepSpecialComments: 0,
      })
    ))
    .pipe(gulpif(!yargs.production, sourcemaps.write()))
    .pipe(gulp.dest(path.join(config.root.dist, config.css.dist)))
    .pipe(reload({ stream: true })));
