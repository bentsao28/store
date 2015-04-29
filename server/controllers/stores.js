var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];
var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();

var data = {};

data.showc = function(req,res){
	Customer.find({}, function(err, results){
		if(err){
			console.log("Error on show!");
		}
		else{
			res.json(results);
		}
	})
}
data.addc = function(req,res){
	var customer = new Customer({name:req.body.name, date: (monthNames[monthIndex] + ' ' + day + ' ' + year)});
	customer.save(function(err, response){
		if(err){
			console.log("Error on customer add!")
		}
		else{
			res.json(response);
		}
	})
}
data.removec = function(req,res){
	Customer.remove({_id:req.body._id}, function(err, response){
		res.json(response);
	})
}
data.showo = function(req,res){
	Order.find({}, function(err, results){
		if(err){
			console.log("Error showing orders");
		}
		else{
			res.json(results);
		}
	})
}
data.addo = function(req,res){
	var order = new Order({name:req.body.name, product:req.body.product, quantity:req.body.quantity, date:(monthNames[monthIndex] + ' ' + day + ' ' + year)});
	order.save(function(err, response){
		if(err){
			console.log('Error on order add!')
		}
		else{
			res.json(response);
		}
	})
	Product.update({name:req.body.product}, {$inc: {quantity: -(req.body.quantity)}}, function(err, response){
		res.end();
	})
}
data.removeo = function(req,res){
	Order.remove({_id:req.body._id}, function(err, response){
		res.json(response);
	})
	Product.update({name:req.body.product}, {$inc: {quantity: req.body.quantity}}, function(err, response){
		res.end();
	})
}
data.showp = function(req,res){
	Product.find({}, function(err, results){
		if(err){
			console.log("Error showing products")
		}
		else{
			res.json(results);
		}
	})
}
data.addp = function(req,res){
	var product = new Product({name:req.body.name, imgurl:req.body.imgurl, description:req.body.description, quantity:req.body.quantity});
	product.save(function(err, response){
		if(err){
			console.log("Error on add!")
		}
		else{
			res.json(response);
		}
	})
}
module.exports = data;