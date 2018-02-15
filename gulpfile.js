'use strict';

const gulp = require('gulp');                               // Gulp Init
const browserSync = require('browser-sync').create();       // BrowserSync Init
const plumber = require('gulp-plumber');                    // Plumber
// BrowserSync task

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./docs"
        }
    });
});



const webpack = require('webpack-stream');
const webpackConfig = require("./webpack.config.js");
const postcss = require('gulp-postcss');
// Gulp plugin
const env = require('gulp-environments');
const gulpif = require ('gulp-if');
const pug = require ('gulp-pug');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
//const twig = require('gulp-twig');
const groupmedia = require('gulp-group-css-media-queries');
const htmlbeautify = require('gulp-html-beautify');

const swPrecache = require('sw-precache');

// Variables
var dist_path = 'docs';

// Environments variable
var dev  = env.development;
var prod = env.production;

//
// Main Tasks


// Sass 
gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.{scss,sass}')
    .pipe(plumber())
    .pipe(sass()
        .on('error',  notify.onError({
            title:   "Sass Error",
            message: "Error: <%= error.message %>"
        })))
    .pipe(groupmedia())
    .pipe(prod(
        postcss([
            require('cssnano')
        ])))
    .pipe(gulp.dest('./' + dist_path + '/css'))
    .pipe(browserSync.stream());
});


// Pug
gulp.task('pug', function () {
    return gulp.src('./source/pug/*.pug')
    .pipe(plumber())
    .pipe(pug()
        .on('error',  notify.onError({
            title:   "Pug Error",
            message: "Error: <%= error.message %>"
        })))
    .pipe(htmlbeautify())
    .pipe(gulp.dest('./' + dist_path + '/'));
  });

// JS
gulp.task('js', function() {
    return gulp.src('./source/js/main.js')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('docs/js'));
  });



//
// Watch Tasks
//

gulp.task('watch', function () {
    gulp.watch('./source/sass/**/*.{scss,sass,css}', ['sass']);
    gulp.watch('./docs/**/*.html', browserSync.reload);
    gulp.watch('./source/pug/**/*.pug', ['pug']);
    gulp.watch('./source/js/**/*.{js,vue}', ['js']).on('change', browserSync.reload);
});

//
// Default
//

gulp.task('default', ['dev']);
gulp.task('dev', ['sass', 'js', 'pug', 'browser-sync', 'watch']);
