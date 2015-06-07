var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    jshint    = require('gulp-jshint'),
    concat    = require('gulp-concat'),
    uglify    = require('gulp-uglify'),
    rename    = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    fs = require('fs'),
    webserver = require('gulp-webserver'),
    buffer = require('vinyl-buffer'),

    streamify = require('gulp-streamify'),
    stringify = require('stringify'),
    reactify = require('reactify'),
    watchify= require('watchify'),
  	
    argv = require('yargs').argv,
    gutil = require('gulp-util'),
    notify = require('gulp-notify');


function handleError(task) {
  return function(err) {
    gutil.log(gutil.colors.red(err));
    notify.onError(task + ' failed, check the logs..')(err);

  };
}

gulp.task('examples', function() {
  return browserify({entries:['./examples/src/example.js'], debug:true})
               .transform(reactify)
               .transform(stringify(['.html']))
                .bundle()
                .pipe(source('examples.min.js'))
                .pipe(gulp.dest('./examples/dist/'))
                .pipe(notify("Examples compiled"));
});

gulp.task('dist', function() {
       return browserify({entries:['./src/index.js'], debug:true})
               .transform(reactify)
                .bundle()
                .pipe(source('react-google-charts.min.js'))
                .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
                .pipe(uglify()) // now gulp-uglify works 
                .pipe(gulp.dest('./dist/'))
                .pipe(notify("JS compiled"));

});
gulp.task('scripts', function() {

     return browserify({entries:['./src/index.js'], debug:true})
               .transform(reactify)
                .bundle()
                .pipe(source('react-google-charts.min.js'))
                .pipe(gulp.dest('./dist/'))
                .pipe(notify("JS compiled"));


}).on('error', handleError);



gulp.task('webserver', function() {
  gulp.src('./examples')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});
gulp.task('watch-scripts', ['scripts'], function() {
  gulp.watch(['./src/*.js', './src/**/*.js'], ['scripts']).on('error', handleError);
  
});


gulp.task('default', ['scripts','watch-scripts'], function(){
    gulp.start('webserver');
}).on('error',handleError)

gulp.task('ex', ['examples', 'watch-examples'], function(){
  gulp.start('webserver');
});

gulp.task('watch-examples',['scripts', 'examples'], function() {
    gulp.watch([ './examples/src/*.js' ], ['examples']).on('error', handleError);
});

gulp.task('build', ['scripts']);

