var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	name: String,
	date: String
})
var Customer = mongoose.model('Customer', CustomerSchema);

var OrderSchema = new mongoose.Schema({
	name: String,
	product: String,
	quantity: Number,
	date: String
})
var Order = mongoose.model('Order', OrderSchema);

var ProductSchema = new mongoose.Schema({
	name: String,
	imgurl: String,
	description: String,
	quantity: Number
})
var Product = mongoose.model('Product', ProductSchema);

CustomerSchema.path('name').required(true, 'You need a name!');
