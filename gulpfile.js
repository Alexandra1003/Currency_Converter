var gulp = require('gulp'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify-es').default,
  browserSync = require('browser-sync'),
  eslint = require('gulp-eslint'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true, once: false }));
});

gulp.task('js', function (done) {
  gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true, once: false }));
  done();
});

gulp.task('js-build', function (done) {
  gulp.src('src/js/index.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true, once: false }));
  done();
});

gulp.task('html', function (done) {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({ stream: true, once: false }));
  done();
});

gulp.task('browser-sync', function () {
  browserSync.init(null, {
    server: {
      baseDir: "dist"
    }
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('watch', function (done) {
  gulp.watch("src/scss/**/*.scss", gulp.series('sass', reload));
  gulp.watch("src/js/*.js", gulp.series('js', reload));
  gulp.watch("src/**/*.html", gulp.series('html', reload));
  done()
});

gulp.task('default', gulp.series('sass', 'html', 'js', 'watch', 'browser-sync', function () {

}));

gulp.task('build', gulp.series('sass', 'html', 'js-build', 'watch', 'browser-sync', function () {

}));