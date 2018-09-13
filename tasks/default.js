modules.exports = function(options) {
	return function(callback){
	    gp.runSequence(
	    	'clean:build',
	    	['styles', 'pug', 'svg', 'copy:libs', 'copy:libs-local', 'copy:img', 'copy:js'],
	    	'server',
			callback
	    )
	};
};
