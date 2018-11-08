var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');


var Files = {
    html: "./catalog.html",
    css_dest: "./css",
    css_main: "./css/style.css",
    scss_all: "./sass/**/*.scss",
    scss_main: "./sass/style.scss"
};

gulp.task('sass', function(){

    return gulp.src(Files.scss_main)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "expanded"}))
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(Files.css_dest))
        .pipe(browserSync.stream())

});

gulp.task('mincss', function () {
    gulp.src(Files.css_main)
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(Files.css_dest));
});


gulp.task('default', ['sass'], function(){

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(Files.scss_all, ['sass']);
    gulp.watch(Files.html, browserSync.reload);

});
