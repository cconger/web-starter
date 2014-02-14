var gulp = require('gulp');
var gutil = require('gulp-util');

var jshint = require('gulp-jshint');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');

gulp.task('connect', connect.server({
  root: ['./build'],
  port: 8080,
  livereload: true,
}));

gulp.task('html', function() {
  gulp.src('./src/html/static/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());

  gulp.src('./src/html/templates/**/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(gulp.dest('./build/templates/'));
});

gulp.task('css', function() {
  gulp.src('./src/styling/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('js', function() {
  gulp.src('./src/js/app.js')
    .pipe(browserify({
      debug: !gulp.env.production,
    }))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.*'], ['html', 'css', 'js']);
});

gulp.task('default', ['connect', 'html', 'css', 'js', 'watch']);
