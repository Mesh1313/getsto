const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const htmlParser = require('fast-html-parser');
const fs = require("fs");

const stosKh = require('./sto_kh_all.json');
const stosMap = require('./sto_kh_all_obj.json');

/*
request('http://vse-sto.com.ua/kharkov/sto/?view=json', (err, resp, body) => {
	console.log(`BODY ${body}`)
})

*/

// const writeStoDetailsToFile = (data) => {
// 	console.log(`Writing sto ID: ${data.id} details to file...`);

// 	fs.writeFile(`./details/${data.id}.json`, JSON.stringify(data), (err) => {
// 	    if (err) {
// 	        console.error(err);
// 	        return;
// 	    };
// 	    console.log("File has been created!");
// 	    console.log("----------------------------------------------");
// 	    // process.exit();
// 	});
// }

// const getList = (nodesList) => {
// 	let list = null;

// 	nodesList.forEach((nd) => {
// 		if (nd.tagName == 'ul') {
// 			list = nd;
// 		}
// 	});

// 	return list;
// };

// const getBrands = (nodesArr) => {
// 	let brands = [];

// 	nodesArr.childNodes.forEach((nd) => {
// 		if (nd.tagName == 'li') {
// 			if (nd.childNodes[0].rawText.indexOf('Специализируется на') !== -1) {
// 				nd.childNodes.forEach((ch) => {
// 					if (ch.tagName == 'a') {
// 						brands.push(ch.rawText)
// 					}
// 				})
// 			}
// 		}
// 	})

// 	return brands;
// };

// const getServices = (nodesArr) => {
// 	let services = [];

// 	nodesArr.childNodes.forEach((nd) => {
// 		if (nd.tagName == 'li') {
// 			if (nd.childNodes[0].rawText.indexOf('Виды работ') !== -1) {
// 				let list = getList(nd.childNodes);
// 				list.childNodes.forEach((ch) => {
// 					if(ch.tagName === 'li') {
// 						let aEl = ch.childNodes[1];
// 						services.push(aEl.rawText);
// 					}
// 				})
// 			}
// 		}
// 	})

// 	return services;
// }

// const parsePage = (data, indx) => {
// 	request('http://vse-sto.com.ua/' + data.url , (err, resp, body) => {
// 		const parsed = htmlParser.parse(body);
// 		let stoObj = {
// 			id: data.id,
// 			brands: [],
// 			services: []
// 		}

// 		console.log("Processing index: " + indx);
// 		console.log("Processing sto ID: " + data.id);
		
// 		stoObj.url = (parsed.querySelector('.url') && parsed.querySelector('.url').rawText) || '';
// 		stoObj.brands = getBrands(parsed.querySelector('.object-info.service-info.data'));
// 		stoObj.services = getServices(parsed.querySelector('.object-info.service-info.data'));

// 		writeStoDetailsToFile(stoObj);
// 	});
// }
// const stosArrToObj = () => {
// 	let mapObj = {};
// 	stosKh.forEach((el) => {
// 		mapObj[el.id] = el;
// 	})

// 	fs.writeFile(`./sto_kh_all_obj.json`, JSON.stringify(mapObj), (err) => {
// 		if (err) {
// 			console.error(err);
// 			return;
// 		};
			
// 		console.log('Finished')
// 	});
// }

app.use(express.static('assets'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.sendFile(path.join(`${__dirname}/index.html`));
});

app.get('/stos', (req, res) => {
	res.json(stosKh);
});

app.get('/sto-details/:id', (req, res) => {
	let data = JSON.parse(fs.readFileSync(`${__dirname}/details/${req.params.id}.json`, 'utf8'));

	res.render('details', {
		sto: data,
		stoDetails: stosMap[data.id]
	});
});

const port = 7777;

app.listen(port, () => {
	console.log(`SERVER STARTED ON PORT ${port}...`);

	// console.log("ARRAY LENGTH: " + stosKh.length);

	// for (let i = 301; i <= 383; i++) {
	// 	parsePage(stosKh[i], i);	
	// }

	// const idx = 77;
	// parsePage(stosKh[idx], idx);
	
});