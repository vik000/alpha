var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlImport = require("gulp-html-import");
var browserSync = require('browser-sync').create();
var tap = require("gulp-tap");

gulp.task('default', function(){
  browserSync.init({server:"dist/"});
  gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);
});

gulp.task('sass', function(){
  gulp.src("src/scss/style.scss")
  .pipe(sass().on("error", sass.logError))
  .pipe(gulp.dest("./dist/styles"))
  .pipe(browserSync.stream());
});

gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(htmlImport('src/components/')) //aquí debería ir gulpImport, pero con eso no sale y me dice que no está definido, mientras que com lo que jhay puesto sí que sale.
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
  });

  
