const mongoose = require('mongoose');

const serviceTypeSchema = mongoose.Schema({
	name: String
});

const serviceTypeModel = mongoose.model('ServiceType', serviceTypeSchema);

module.exports.serviceTypeSchema = serviceTypeSchema;
module.exports.serviceTypeModel = serviceTypeModel;