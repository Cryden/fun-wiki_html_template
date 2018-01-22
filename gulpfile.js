'use strict';
 
const gulp = require('gulp');
const gulpif = require ('gulp-if');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const twig = require('gulp-twig');
const postcss = require('gulp-postcss');
const groupmedia = require('gulp-group-css-media-queries');

var dev = false;

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
    .pipe(gulp.dest('./doc/css'));
});

gulp.task('twig', function () {
    return gulp.src('./source/twig/**/*.htm')
    .pipe(twig()
        .on('error',  notify.onError({
            title:   "Twig Error",
            message: "Error: <%= error.message %>"
        })))
    .pipe(gulp.dest('./doc/'));
  });

// Watch Tasks

gulp.task('sass:watch', function () {
  gulp.watch('./source/sass/**/*.scss', ['sass']);
});

gulp.task('twig:watch', function () {
    gulp.watch('./source/twig/**/*.htm', ['twig']);
});