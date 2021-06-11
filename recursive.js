var fs = require("fs");
let resultState;

function processFile(filename) {
	let results = {
		filename: filename,
		total: 0,
		subFiles: [],
	};

	let nameFile = fs.readFileSync(filename, "utf8");
	let arr = nameFile.split(/\r\n|\n/);
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

processFile("A.txt");

if (resultState) {
	/* console.log(resultState); */
	formatResults(resultState);
}
