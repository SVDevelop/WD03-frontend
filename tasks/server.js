var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function(options) {
	return function() {
		browserSync.init({
			server: options.server
		});

		// for (var taskName in options.path){
		// 	$.watch(options.path[taskName], function(){
		// 		gulp.start(taskName);
		// 	});
		// 	return;
		//
		// };


	};
};
