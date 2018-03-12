/**
 * Build HTML
 */
const gulp = require('gulp');
const { reload } = require('browser-sync');
const pug = require ('gulp-pug');
const notify = require('gulp-notify');
const path = require('path');
const plumber = require('gulp-plumber');
const htmlbeautify = require('gulp-html-beautify');

const config = require('./config');
const yargs = require('yargs').argv

gulp.task('pug', () =>
    gulp
        .src(path.join(config.root.dev, config.pug.dev, '*.pug'))
        .pipe(plumber())
        .pipe(pug()
            .on('error',  notify.onError({
                title:   "Pug Error",
                message: "Error: <%= error.message %>"
            })))
        .pipe(htmlbeautify())
        .pipe(gulp.dest(path.join(config.root.dist, config.pug.dist))));