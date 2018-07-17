const express = require('express');
const app = express();
const fs = require('fs');

const stosMap = require('./sto_kh_all_obj.json');
const stosKh = require('./sto_kh_all.json');

const processServices = () => {
	servicesList = [];

	stosKh.forEach((sto) => {
		let stoDetails = getDetails(sto);

		if (stoDetails.services.length) {
			servicesList.push(...stoDetails.services);	
		}
	});

	console.log('unprocessed services ', servicesList.length);

	let uniq = servicesList.filter((value, index, self) => {
		return self.indexOf(value) === index;
	});

	console.log('uniq services ', uniq.length);

	fs.writeFile(`./services_list.json`, JSON.stringify(uniq), (err) => {
		if (err) {
			console.error(err);
			return;
		};
			
		console.log('Finished Writing Services...');
	});
};

const processBrands = () => {
	brandsList = [];

	stosKh.forEach((sto) => {
		let stoDetails = getDetails(sto);

		if (stoDetails.brands.length) {
			brandsList.push(...stoDetails.brands);	
		}
	});

	console.log('unprocessed brands ', brandsList.length);

	let uniq = brandsList.filter((value, index, self) => {
		return self.indexOf(value) === index;
	});

	console.log('uniq brands ', uniq.length);

	fs.writeFile(`./brands_list.json`, JSON.stringify(uniq), (err) => {
		if (err) {
			console.error(err);
			return;
		};
			
		console.log('Finished Writing Brands...');
	});
};

const getServiceTypes = () => {
	serviceTypesList = [];

	stosKh.forEach((sto) => {
		if (sto.service_type) {
			serviceTypesList.push(sto.service_type);	
		}
	});

	let uniq = serviceTypesList.filter((value, index, self) => {
		return self.indexOf(value) === index;
	});

	console.log('uniq service types ', uniq);

	fs.writeFile('./service_types_list.json', JSON.stringify(uniq), (err) => {
		if (err) {
			console.error(err);
			return;
		};
			
		console.log('Finished Writing Service Types List...');
	});
};

const getDetails = (sto) => {
	return JSON.parse(fs.readFileSync(`${__dirname}/details/${sto.id}.json`, 'utf8'));
};

const port = 7778;
app.listen(port, () => {
	console.log(`SERVER STARTED ON PORT ${port}...`);

	// processBrands();
	// processServices();

	getServiceTypes();
});