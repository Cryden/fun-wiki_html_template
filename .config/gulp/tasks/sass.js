/**
 * Build CSS
 */

const autoprefixer = require('gulp-autoprefixer');
const glob = require('glob');
const gulpif = require('gulp-if');
const minify = require('gulp-clean-css');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uncss = require('gulp-uncss');
const groupmedia = require('gulp-group-css-media-queries');
const cssUseref = require('gulp-css-useref');

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

function css() {
  return gulp
    .src(path.join(config.source, 'sass', '**/*.{scss,sass}'))
    .pipe(gulpif(!yargs.production, sourcemaps.init()))
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "Sass Error",
        message: "Error: <%= error.message %>"
      })
    }))
    .pipe(sass({
      includePaths: ['./node_modules', './bower_components'],
      outputStyle: 'expanded',
      sourceMap: true,
      errLogToConsole: true,
    }))
    .pipe(gulpif(config.css.uncss, uncss({
        html: path.join(config.build, '*.html'),
        ignore: unCssIgnore,
      })))
    .pipe(autoprefixer({
      browsers: ['last 3 version'],
    }))
    .pipe(groupmedia())
    .pipe(gulpif(yargs.production,minify({
        keepSpecialComments: 0,
      })))
    .pipe(gulpif(!yargs.production, sourcemaps.write()))
    .pipe(cssUseref({
    base: path.join('../', config.build)
    }))
    .pipe(gulp.dest(path.join(config.build, 'css')))
    .pipe(browserSync.reload({ stream: true }))
}

gulp.task('sass', css);

