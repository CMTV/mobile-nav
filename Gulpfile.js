const gulp = require('gulp');

const browser_sync = require('browser-sync');
const scss = require('gulp-scss');
const clean_css = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify_js = require('gulp-uglify');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');

gulp.task('dev', ['browser-sync']);

gulp.task('browser-sync', ['build-scripts', 'build-styles'], () => {
    browser_sync.init({
        server: {
            baseDir: './'
        },
        files: ['test/**/*']
    });

    gulp.watch('src/**/*.js', ['build-scripts']);
    gulp.watch('src/**/*.scss', ['build-styles']);
});

gulp.task('build-scripts', () => {
    return gulp.src('src/**/*.js')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify_js())
        .pipe(concat('mobile-nav.min.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(browser_sync.stream());
});

gulp.task('build-styles', () => {
    return gulp.src('src/**/*.scss')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(clean_css())
        .pipe(concat('mobile-nav.min.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(browser_sync.stream());
});