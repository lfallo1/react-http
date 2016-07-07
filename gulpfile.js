"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        jsx: './src/**/*.jsx',
        js: './src/**/*.js',
        images: './src/images/*',
        css: './src/css/*.css',
        public: './public',
        mainJsx: './src/main.jsx'
    }
}

//Start a local development server
gulp.task('connect', function() {
    connect.server({
        root: ['public'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function() {
    gulp.src('public/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));

    open({uri: 'localhost:6069'});
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.public))
        .pipe(connect.reload());
});

gulp.task('jsx', function() {
    browserify(config.paths.mainJsx)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.paths.public + '/js'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.public + '/css'))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.public + '/images'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch([config.paths.jsx,config.paths.js], ['jsx']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'jsx', 'css', 'images', 'open', 'watch']);
