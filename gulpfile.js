// NODEJS ambiente de ejecución
// De Node js -> REQUIRET y Exporte
//requiret -> permite importar al archivo las depedencias descargadas para ser utilizadas
const { series, src, dest, watch } = require('gulp'); //extraemos la funcion series de gulp 
const sass = require('gulp-sass'); // no lleva {} ya que no tiene multiples funciones, si las tuviera se pone el nombre de la funcion a importar
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

 // utilidades CSS
 const autoprefixer = require('autoprefixer');
 const postcss = require('gulp-postcss');
 const cssnano = require('cssnano'); // escribir codigo de ultima generecion optimizado
 const sourcemaps = require('gulp-sourcemaps');

// utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const pashs = {
    imagenes : 'src/img/**/*',
    scss : 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css() {
    return src(pashs.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'))
}

function javascript(){
    return src(pashs.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({suffix:'.min'}))
        .pipe(dest('./build/js'))
}

function imagenes(){
    return src(pashs.imagenes)
        .pipe(imagemin()) //minifica las imagenes
        .pipe(dest('./build/img')) //coloca las imagenes en la carpeta
        .pipe(notify({message : 'Imagen Minificada'}));
}

function versionWebp(){
    return src(pashs.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({message : 'Version Webp Lista'}));
}

function watchArchivos(){
    watch(pashs.scss, css) // cuando el carchivo cambie, ejecute css
    watch(pashs.js, javascript)
    // * = carpeta actual
    // /**/*.scss = que busque en todas las carpetas archivos con esa extencion
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos);