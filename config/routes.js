var data = require('./../server/controllers/stores.js');
module.exports = function(app){
	app.get('/customers', function(req, res){
		data.showc(req,res);
	})
	app.post('/add_customer', function(req,res){
		data.addc(req,res);
	})
	app.post('/remove_customer', function(req,res){
		data.removec(req,res);
	})
	app.get('/orders', function(req, res){
		data.showo(req,res);
	})
	app.post('/add_order', function(req, res){
		data.addo(req,res);
	})
	app.post('/remove_order', function(req, res){
		data.removeo(req,res);
	})
	app.get('/products', function(req, res){
		data.showp(req,res);
	})
	app.post('/add_product', function(req, res){
		data.addp(req,res);
	})
}