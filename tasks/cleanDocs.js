var del = require('del');

module.exports = function(options) {
	return function() {
		return del(options.del);
	};
};
