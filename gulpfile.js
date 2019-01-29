// http://blog.carlosroso.com/setting-up-gulp-with-express-and-livereload/
// https://gist.github.com/dstroot/22525ae6e26109d3fc9d

var gulp = require('gulp');  
var nodemon = require('gulp-nodemon');  
var sass = require('gulp-sass');  
var jshint = require('gulp-jshint');  
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");  
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
  .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
  .pipe(gulp.dest('./vendor/font-awesome'))

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
    ])
  .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
    './node_modules/jquery.easing/*.js'
    ])
  .pipe(gulp.dest('./vendor/jquery-easing'))

  // Magnific Popup
  gulp.src([
    './node_modules/magnific-popup/dist/*'
    ])
  .pipe(gulp.dest('./vendor/magnific-popup'))
});


// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./public/css/scss/**/*.scss')
  .pipe(sass.sync({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(gulp.dest('./public/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
    './public/css/*.css',
    '!./public/css/*.min.css'
    ])
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./public/css'))
    //.pipe(livereload());
    .pipe(browserSync.stream());
  });

// CSS
gulp.task('css', ['css:compile', 'css:minify']);


// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
    './public/js/*.js',
    '!./public/js/*.min.js'
    ])
    //.pipe(jshint('./public/js/jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/js'))
    //.pipe(livereload());
    .pipe(browserSync.stream());
  });

// JS
gulp.task('js', ['js:minify']);


gulp.task('ejs', function(){  
  return gulp.src('./views/**/*.ejs')
    //.pipe(livereload());
    .pipe(browserSync.stream());
  });

gulp.task('watch', ['vendor', 'css', 'js', 'ejs']);

gulp.task('nodemon', function (cb) {
  
  var started = false;
  
  return nodemon({
    script: 'app.js',
    ignore: [
    'gulpfile.js',
    'node_modules/'
    ]
  })
  .on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      started = true; 
      cb();
    } 
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 600);
  });
});

gulp.task('browserSync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["public/**/*.*"],
    browser: "chrome",
    port: 7000,
  });
});

//gulp.task('serve', ['watch', 'server']);  

// Dev task
gulp.task('dev', ['css', 'js', 'nodemon', 'browserSync'], function() {
  gulp.watch('./public/css/scss/*.scss', ['css']);
  gulp.watch('./public/js/*.js', ['js']);
  gulp.watch('./views/**/*.ejs', ['ejs']);
  //gulp.watch('./app.js', ['nodemon']);
});