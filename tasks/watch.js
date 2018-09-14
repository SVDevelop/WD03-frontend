var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function(options) {
	return function() {
		$.watch('./src/pug/**/*.*', function(){
		gulp.start('pug');
		});

		$.watch('./src/less/**/*.less', function(){
			gulp.start('styles');
		});

		$.watch('./src/js/**/*.js', function(){
			gulp.start('copy:js');
		});

		$.watch('./src/libs/**/*.*', function(){
			gulp.start('copy:libs-local');
		});

		$.watch(['./src/img/**/*.*', '!./src/img/svg-for-sprites/**/*.svg'], function(){
			gulp.start('copy:img');
		});

		$.watch('./src/img/svg/*.svg', function(){
			gulp.start('svg');
		});

		// for (var taskName in options.path){
		// 	$.watch(options.path[taskName], function(){
		// 		gulp.start(taskName);
		// 	});
		//
		// 	return;
		// };

	};
};
