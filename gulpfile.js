var argv = require('yargs').argv;
var path = argv.path || './src/components/Chart.js';
var docsDest = argv.docsDest || 'docs/'
var gulp = require('gulp');
var gulpReactDocs = require('gulp-react-docs');

gulp.task('react-docs', function() {
  console.log(path, docsDest);
    return gulp.src(path)
        .pipe(gulpReactDocs({
            path: docsDest
        }))
        .pipe(gulp.dest(docsDest));
});
