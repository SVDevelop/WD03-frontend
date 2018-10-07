var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function(options) {
	return function() {
		browserSync.init({
			server: options.server
		});

		(function() {
			// let watchers = [];
			//
			// for (var taskName in options.path) {
			// 	//watchers.splice(0, 0, [taskName, options.path[taskName]]);
			// 	watchers.push([taskName, options.path[taskName]]);
			// }
			// for(let i = 0; i < watchers.length; i++) {
			// 	$.watch(watchers[i][1], function(){
			// 		gulp.start(watchers[i][0]);
			// 	});
			// }
			for(let i = 0; i < options.path.length; i++) {
				$.watch(options.path[i][1], function(){
					gulp.start(options.path[i][0]);
				});
			}
		})();


	};
};
