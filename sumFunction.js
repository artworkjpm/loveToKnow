/* A.txt - 111
B.txt - 39
C.txt - 12 */
const startFile = "A.txt";
var fs = require("fs");
let files = [];
let sum = [];
let printArray = [];
const allLines = (data) => {
	let arr = data.split(/\r\n|\n/);
	arr.forEach((line) => {
		if (line.includes(".txt")) {
			files.push(line);
		} else {
			sum.push(Number(line));
		}
	});
};

let getFileData = (fileName) => {
	let nameFile = fs.readFileSync(fileName, "utf8");
	allLines(nameFile);
};

getFileData(startFile);

function addUpFileNumbers(numberArray) {
	return numberArray.reduce((prev, curr) => prev + curr);
}

printArray.push({
	[`${startFile}`]: addUpFileNumbers(sum),
});

function finalPrintOut(arrayLooper) {
	return arrayLooper.forEach((item) => {
		let obj = Object.entries(item);
		console.log(obj[0][0] + " - " + obj[0][1]);
	});
}

/* console.log(sum);
console.log(printArray); */
/* console.log(files); */
/* console.log(sum); */
/* var obj = [{ 1: [10, 10] }, { 2: [10, 10] }]; */
/* files.forEach((item) => {}); */
finalPrintOut(printArray);
