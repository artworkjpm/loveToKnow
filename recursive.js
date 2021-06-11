const fileNameStarter = "A.txt";
var fs = require("fs");
let resultState;

function processFile(filename) {
	let nameFile = fs.readFileSync(filename, "utf8");
	let arr = nameFile.split(/\r\n|\n/);
	let results = {
		filename: filename,
		total: 0,
		subFiles: [],
	};

	arr.forEach((line) => {
		if (!line.includes(".txt")) {
			results.total += Number(line);
		} else {
			let subFileResults = processFile(line);
			results.subFiles.push(subFileResults);
		}
	});
	return (resultState = results);
}

function formatResults(res) {
	console.log(`${res.filename} - ${res.total}`);
	return res.subFiles.forEach((item) => {
		formatResults(item);
	});
}

processFile(fileNameStarter);

if (resultState) {
	formatResults(resultState);
}
