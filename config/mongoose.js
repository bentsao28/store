var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
mongoose.connect('mongodb://localhost/store');
var models_path = path.join(__dirname + './../server/models');
fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >= 0) {
		require(models_path + '/' + file);
	}
})