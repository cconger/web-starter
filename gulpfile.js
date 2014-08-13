var gulp = require('gulp');
var gutil = require('gulp-util');

var jshint = require('gulp-jshint');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var webserver = require('gulp-webserver');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

gulp.task('webserver', function() {
  return gulp.src('build')
  .pipe(webserver({
    livereload: true,
    directoryListing: false,
    port: 8080,
    open: true
  }));
});

gulp.task('html', function() {
  return gulp.src('./src/html/static/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/'));
});

gulp.task('css', function() {
  return gulp.src('./src/styling/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('js', function() {
  var bundler = browserify();
  bundler.add('./src/js/app.js');

  return bundler.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('watchJs', function() {
  var bundler = watchify(browserify(watchify.args));

  bundler.add('./src/js/app.js');

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.bgRed('Error'), err.annotated);
        this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build/js/'));
  };

  bundler.on('update', bundle);
  bundler.on('time', function(time) {
    gutil.log(gutil.colors.green('[Browserify]'),
              'packaged in',
              gutil.colors.magenta(time),
              gutil.colors.magenta('ms'));
  });

  return bundle();
  
});

gulp.task('watchStatic', function() {
  return gulp.watch(['./src/html/**/*.*', './src/styling/**/*.*'], ['css', 'js']);
});

gulp.task('default', ['html', 'css', 'js']);
gulp.task('serve', ['default', 'webserver']);
gulp.task('dev', ['html', 'css', 'watchJs', 'watchStatic', 'webserver']);
