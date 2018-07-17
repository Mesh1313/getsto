const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stoSchema = mongoose.Schema({
	id: Number,
	name: String,
	title: String,
	tel: String,
	service_type: {type: Schema.Types.ObjectId, ref: 'ServiceType'},
	address: String,
	lat: Number,
	lng: Number,
	url: String,
	brands: [{type: Schema.Types.ObjectId, ref: 'Brand'}],
	services: [{type: Schema.Types.ObjectId, ref: 'Service'}]
});

const Sto = mongoose.model('Sto', stoSchema);

module.exports = Sto;