var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');


gulp.task('less', function () {
    gulp.src('./less/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less') ]
        }))
        .pipe(gulp.dest('./statics/css'));
});


gulp.task('copy', function () {
    gulp.src('./app/browser/*.js')
        .pipe(gulp.dest('./statics/js/game/'));
});
gulp.task('deploy', ['copy','less'],function () {
    var deployPath = '/var/www/tic-tac-toe/'; // TODO update deployPath variable
     gulp.src(['./index.html'])
         .pipe(gulp.dest(deployPath));
    gulp.src(['./statics/**/*'])
        .pipe(gulp.dest(deployPath+'statics'));
});


gulp.task('watch', function () {
    gulp.watch('./less/style.less', ['less']);
    gulp.watch('./app/browser/*.js', ['copy']);
});

gulp.task('default', ['less', 'copy', 'watch'], function () {
});