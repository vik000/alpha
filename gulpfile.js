var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlImport = require("gulp-html-import");
var browserSync = require('browser-sync').create();
var tap = require("gulp-tap");
var browserify = require("browserify");
var buffer = require("gulp-buffer");

gulp.task('default', function(){
  browserSync.init({server:"dist/"});
  gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);
  gulp.watch(["src/*.html","src/**/*.html"],["html"]);
  gulp.watch(["src/js/*.js","src/js/**/*.js"],["js"]);

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

  gulp.task("js",function(){
    gulp.src("src/js/main.js")
      .pipe(tap(function(file){ //tenemos que usar tap para poder hacer funciones en cadena.
        //ahora vamos a reemplazar main.js por lo que nos devuelva browserify cuando le pasemos main.js (es decir, lo modifica)
        file.contents = browserify(file.path)
                        .transform("babelify", {presets:["es2015"]}) //esto traduce el código de ES6 a ES5
                        .bundle() //esto compila el archivo (es lo que junta/concatena todos los archivos)
                        .on("error", function(error){
                          //si tuviésemos notify, errores por notify, creo que no pasa nada por que esto esté en blanco.
                        })
      }))
      .pipe(buffer()) //transforma de nuevo a buffer (es un require aparte) para que podamos seguir trabajando con ello.
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
  });
