const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
	name: String
});

const Service = mongoose.model('Service', serviceSchema);

module.exports.serviceSchema = serviceSchema;
module.exports.serviceModel = Service;