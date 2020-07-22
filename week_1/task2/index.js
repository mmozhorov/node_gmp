const util = require('util');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

async function convertDataFromCSVFile( chunk ) {
    return csv({ noheader: true, output: "csv" }).fromString(chunk);
}

async function writeDataToTXTFile() {
    //fs.writeFile(  )
}

const readFilePath = path.resolve('./task2/csv/example.csv');
const writeFilePath = path.resolve('./task2/txt/result.txt');

const readStream = new fs.createReadStream(readFilePath, "utf8");
const writeStream = fs.createWriteStream(writeFilePath);

readStream.on("data", async function(chunk){
    const [ headers, ...rows ] = await convertDataFromCSVFile(chunk);
    console.log(headers);

});


// readStream.pipe(writeStream);
