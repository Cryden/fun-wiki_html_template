'use strict';
 
const gulp = require('gulp');
const gulpif = require ('gulp-if');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const twig = require('gulp-twig');
const postcss = require('gulp-postcss');
const groupmedia = require('gulp-group-css-media-queries');
const webpack = require('webpack-stream');

var dev = false;
var dist_path = 'docs';

// Main Tasks

gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.scss')
    .pipe(sass()
        .on('error',  notify.onError({
            title:   "Sass Error",
            message: "Error: <%= error.message %>"
        })))
    .pipe(groupmedia())
    .pipe(gulpif(dev, 
        postcss([
            require('cssnano')
        ])))
    .pipe(gulp.dest('./' + dist_path + '/css'));
});

gulp.task('twig', function () {
    return gulp.src('./source/twig/**/*.htm')
    .pipe(twig()
        .on('error',  notify.onError({
            title:   "Twig Error",
            message: "Error: <%= error.message %>"
        })))
    .pipe(gulp.dest('./' + dist_path + '/'));
  });

  gulp.task('js', function() {
    return gulp.src('./source/js/app.js')
    .pipe(webpack({
          output: {
            filename: '[name].js',
          },
        }))
    .pipe(gulp.dest('docs/js'));
  });

// Watch Tasks

gulp.task('watch', function () {
  gulp.watch('./source/sass/**/*.scss', ['sass']);
  gulp.watch('./source/twig/**/*.htm', ['twig']);
  gulp.watch('./source/js/**/*.js', ['js']);
});