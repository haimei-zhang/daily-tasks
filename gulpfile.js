const gulp = require('gulp');
const gzip = require('gulp-gzip');

gulp.task('compress', function () {
  gulp.src(['./dist/assets/*.png', './dist/assets/*.gif'])
    .pipe(gzip({append: false}))
    .pipe(gulp.dest('./dist/assets'));

  gulp.src(['./dist/*.js', './dist/*.css', './dist/*.ttf', './dist/*.woff', './dist/*.woff2', './dist/*.svg', './dist/*.png', './dist/*.gif'])
    .pipe(gzip({append: false}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('process-bundle', function () {
  function processFile() {
    const through = require('through2');

    function process(file) {
      const content = file.contents
        .toString()
        .replace('__webpack_require__.p = ""', '__webpack_require__.p = window.s3bucket');

      file.contents = Buffer(content);

      return file;
    }

    return through.obj(function(file, encoding, callback) {
      callback(null, process(file));
    });
  }

  return gulp.src('./dist/inline.bundle.js', {allowEmpty: true})
    .pipe(processFile())
    .pipe(gulp.dest('./dist'));
});


gulp.task('build', gulp.series('process-bundle', 'compress'));
