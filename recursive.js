const fileToProcess = "A.txt";
var fs = require("fs");
let resultState;
let storeNameFile = [];
let errorMessage = "";

function checkIfDuplicateExists(arr) {
	return new Set(arr).size !== arr.length;
}

function processFile(filename) {
	//save filename to stop infinite loops
	storeNameFile.push(filename);
	// try check to print out err.message if fileToProcess name is wrong
	if (!checkIfDuplicateExists(storeNameFile)) {
		try {
			let nameFile = fs.readFileSync(filename, "utf8");
			let arr = nameFile.split(/\r\n|\n/);
			let results = {
				filename: filename,
				total: 0,
				subFiles: [],
			};

			arr.forEach((line) => {
				if (!line.includes(".txt") && !errorMessage) {
					results.total += Number(line);
				} else {
					//call recursive function to repeat the process
					let subFileResults = processFile(line);
					results.subFiles.push(subFileResults);
				}
			});
			//accumalate the subfile numbers and add onto total
			if (results.subFiles.length && !checkIfDuplicateExists(storeNameFile)) {
				results.subFiles.forEach((item) => (results.total += item.total));
			}

			return (resultState = results);
		} catch (err) {
			console.error(err.message);
			errorMessage = err.message;
		}
	}
}

function formatResults(res) {
	console.log(`${res.filename} - ${res.total}`);
	return res.subFiles.forEach((item) => {
		formatResults(item);
	});
}

processFile(fileToProcess);

if (resultState && !checkIfDuplicateExists(storeNameFile)) {
	formatResults(resultState);
} else if (checkIfDuplicateExists(storeNameFile) && !errorMessage) {
	console.error("You have a possible infinite loop, check you haven't passed in the first file in another file,  eg A.txt is not inside B.txt");
} else {
	console.error(errorMessage);
}
