const express = require('express');
const app = express();
const fs = require('fs');
const db = require('./db');

const brandsData = require('./brands_list.json');
const servicesData = require('./services_list.json');
const stosKh = require('./sto_kh_all.json');
const serviceTypesData = require('./service_types_list.json');

// shemas
const Sto = require('./schemas/stoSchema');
const Brand = require('./schemas/brandSchema').brandModel;
const Service = require('./schemas/serviceSchema').serviceModel;
const ServiceType = require('./schemas/serviceTypeSchema').serviceTypeModel;

const getStoDetails = (sto) => {
	return JSON.parse(fs.readFileSync(`${__dirname}/details/${sto.id}.json`, 'utf8'));
};

const findStos = () => {
	Sto.find((err, stos) => {
		if (err) return console.error(err);
		console.log(stos);
	})
};

const writeBrandsCollection = () => {
	let finished = 0;
	let brandsDataLength = brandsData.length;
	brandsData.forEach((brand) => {
		let newBrand = new Brand({name: brand});
		newBrand.save(err => {
			if (err) return console.err('writeBrandsCollection error: ', err);

			finished++;
			if (finished == brandsDataLength) {
				console.log('Brands Collection write finished!');
			}
		})
	})
};

const writeServicesCollection = () => {
	let finished = 0;
	let servicesDataLength = servicesData.length;
	servicesData.forEach((service) => {
		let newService = new Service({name: service});
		newService.save(err => {
			if (err) return console.err('writeServicesCollection error: ', err);

			finished++;
			if (finished == servicesDataLength) {
				console.log('Service Collection write finished!');
			}
		});
	});
};

const writeServiceTypesCollection = () => {
	let finished = 0;
	let serviceTypesDataLength = serviceTypesData.length;
	serviceTypesData.forEach((service) => {
		let newServiceType = new ServiceType({name: service});
		newServiceType.save(err => {
			if (err) return console.err('writeServiceTypesCollection error: ', err);

			finished++;
			if (finished == serviceTypesDataLength) {
				console.log('Service Types Collection write finished!');
			}
		});
	});
};

// Create Stos Collection helpers START
const getServiceType = (data) => {
	const promise = new Promise((resolve, reject) => {
		ServiceType.find({name: data.service_type}, (err, sType) => {
			if (err) {
				console.error('getServiceType error: ', err)
				reject({
					error: err
				});
				return;
			}

			resolve(sType[0]._id);
		})	
	})
	
	return promise;
};

const getBrandsArr = (data) => {
	const promise = new Promise((resolve, reject) => {
		let finished = 0;
		let brandsCount = data.brands.length
		let brandsArr = [];

		if (brandsCount === 0) resolve([]);

		data.brands.forEach((brand) => {
			Brand.find({name: brand}, (err, resBrand) => {
				let brand = resBrand[0];

				if (brand) {
					brandsArr.push(brand._id);	
				}
				
				finished++;

				if (finished === brandsCount) {
					resolve(brandsArr);
				}
			});
		});
	})

	return promise;
}

const getServicesArr = (data) => {
	const promise = new Promise((resolve, reject) => {
		let finished = 0;
		let servicesCount = data.services.length
		let serviceArr = [];

		if (servicesCount === 0) resolve([]);

		data.services.forEach((service) => {
			Service.find({name: service}, (err, resService) => {
				let service = resService[0];

				if (service) {
					serviceArr.push(service._id);	
				}
				
				finished++;

				if (finished === servicesCount) {
					resolve(serviceArr);
				}
			});
		});
	})

	return promise;
}
// Create Stos Collection helpers END

const writeStosCollection = (stoData) => {
	return new Promise((resolve, reject) => {
		let stoDetails = getStoDetails(stoData);

		Promise.all([getServiceType(stoData),
					getBrandsArr(stoDetails),
					getServicesArr(stoDetails)])
		.then(resArr => {
			let newSto = new Sto({
				id: stoData.id,
				name: stoData.name,
				title: stoData.title,
				tel: stoData.tel,
				address: stoData.address,
				lat: stoData.lat,
				lng: stoData.lng,
				url: stoDetails.url,
				service_type: resArr[0],
				brands: resArr[1],
				services: resArr[2]
			});

			newSto.save((err) => {
				if (err) reject('Sto not saved! Err: ', err);

				resolve(`Sto ID = ${newSto.id} SAVED...`);
			});
		})
	});
};

const port = 7755;

app.listen(port, () => {
	console.log(`SERVER STARTED ON PORT ${port}...`);

	db.openDbConnection();
	db.connectToDb(
		() => {
			let finished = 0;
			stosKh.forEach((sto) => {
				writeStosCollection(sto).then((result) => {
					finished++;

					console.log(result);

					if (stosKh.length === finished) {
						console.log('Stos db collection filled!!!');
					}
				}).catch((err) => {
					console.error(err);
				}); 	
			});

			// Sto
			// 	.findOne({id: 327})
			// 	.populate('service_type')
			// 	.populate('brands')
			// 	.populate('services')
			// 	.exec((err, sto) => {
			// 		if (err) return console.error('Error geting sto: ', err);

			// 		console.log(sto);
			// 	})
		}
	);
});


// TO SORT SOMTH
// 	brands.sort((a, b) => {
			// 		const A = a.name.toUpperCase();
			// 		const B = b.name.toUpperCase();

			// 		let comparison = 0;
			// 		if (A > B) {
			// 			comparison = 1;
			// 		} else if (A < B) {
			// 			comparison = -1;
			// 		}
			// 		return comparison;
			// 	});