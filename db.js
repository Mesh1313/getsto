const mongoose = require('mongoose');
const dbPath = 'mongodb://localhost:27017/stosdb';
const dbOptions = {useNewUrlParser: true};

const openDbConnection = () => {
	mongoose.connect(
		dbPath, 
		dbOptions
	);
};

const connectToDb = (callback) => {
	let db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		console.log('Connected to db...');
		callback();
	});
};

module.exports = {
	openDbConnection,
	connectToDb
};