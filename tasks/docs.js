var runSequence = require('run-sequence');

module.exports = function(options) {
	return function(callback){
	    runSequence(options.tasks, callback)
	};
};
