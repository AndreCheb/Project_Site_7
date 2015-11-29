/*!Установить
* gulp
* $ npm install gulp-less gulp-minify-css gulp-uglify gulp-notify gulp-htmlmin --save-dev
*/

var gulp = require('gulp'),
less = require('gulp-less'),
gutil = require('gulp-util'),
minifyCss = require('gulp-minify-css')
uglify = require('gulp-uglify'),
notify = require('gulp-notify')
htmlmin = require('gulp-htmlmin');

gulp.task('default', function(){
  // place code for your default task here
});

/* Минимизация css-файлов */
gulp.task('minify-css', function() {
  gulp.src('./www/css/*.css')
  	 .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'))
    //.pipe(notify({ message: 'Styles task complete' }));
});

/* Минимизация js-файлов */
gulp.task('uglify', function() {
  gulp.src('./www/js/*.js')
  	 .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

/* Минимизация html-файлов */
gulp.task('htmlmin', function() {
  return gulp.src('./www/*.html')
  	 .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'))
});

// Очистка ???
gulp.task('clean', function(cb) {
del(['dist/css', 'dist/js'], cb)
});

/* Слежение за изменениями файла (-ов) */
gulp.task('watch', function(){
  gulp.watch('src/less/*.less', ['less']);
});

/* Перед окончательным компилированием надо сделать преобразование less-файлов в css-файлы */

/* Преобразование less-файлов в css-файлы  */
gulp.task('less', function() {
    gulp.src('./src/less/styles.less')
  /* gulp.src('./src/less/*.less')  преобразование всех less-файлов */
  	 .pipe(less())
    .pipe(gulp.dest('./www/css'))
    .pipe(gulp.dest('./dist/css'))
});

/* Окончательное компилирование */
// Задача по-умолчанию
gulp.task('default', ['htmlmin'], function() {
gulp.start('minify-css', 'uglify');
});

