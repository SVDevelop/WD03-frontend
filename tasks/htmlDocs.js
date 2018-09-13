var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
modules.exports = function(options) {
	return function() {
	    return gulp.src(options.src)
	    	.pipe($.usemin({
	    		//  <!-- build:cssVendor css/vendor.css --> <!-- endbuild -->
				cssVendor: [function() { return $.rev() }, function() { return $.minifyCss() } ],
				cssCustom: [function() { return $.rev() }, function() { return $.minifyCss() } ],
				jsLibs: [function() { return $.rev() }, function() { return $.uglify() } ],
				jsVendor: [function() { return $.rev() }, function() { return $.uglify() } ],
				jsMain: [function() { return $.rev() }, function() { return $.uglify() } ]
	    	}))
			.pipe($.htmlclean())
		.pipe(gulp.dest(options.dest));
	};
};
