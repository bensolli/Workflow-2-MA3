const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');


function css() {
  return src('sass/**/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('css'))
    .pipe(browserSync.stream())
}

function imgMin(){
    return src('images/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
}

function move(){
  return gulp.src('./*.html')
  .pipe(gulp.dest('./dist'))
}

function watch(){
  browserSync.init({
    server: {
      baseDir: './',
    }
  });
  gulp.watch('./sass/**/*.scss', css);
  gulp.watch('./*html', move)
  gulp.watch('./*.html').on('change', browserSync.reload)
}

exports.watch = watch;
exports.imgMin = imgMin;