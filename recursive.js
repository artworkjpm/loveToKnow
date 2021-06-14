const fileToProcess = "A.txt";
var fs = require("fs");
let resultState;
let storeNameFile = [];

function checkIfDuplicateExists(arr) {
	return new Set(arr).size !== arr.length;
}

function processFile(filename) {
	//save filename to stop infinite loops
	storeNameFile.push(filename);
	//check filename has not already been passed in as a subfile, eg A.txt is not inside B.txt
	if (!checkIfDuplicateExists(storeNameFile)) {
		// try check to print out err.message if fileToProcess name is wrong
		try {
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
		} catch (err) {
			console.error(err.message);
		}
	} else {
		console.error("You have an infinite loop, check you haven't passed in the first file in another file,  eg A.txt is not inside B.txt");
	}
}

function formatResults(res) {
	console.log(`${res.filename} - ${res.total}`);
	return res.subFiles.forEach((item) => {
		formatResults(item);
	});
}

processFile(fileToProcess);

if (resultState) {
	formatResults(resultState);
}
