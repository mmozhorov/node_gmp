import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

async function convertDataFromCSVString( chunk ) {
    return csv({ noheader: true, output: "csv" }).fromString(chunk);
}

function generateJSONRow( headers, row ) {
    const result = {};
    for ( let i = 0; i < headers.length; i++ ){
        result[headers[i]] = row[i];
    }
    return JSON.stringify(result) + '\n';
}

const readFilePath = path.resolve('./task3/csv/example.csv');
const writeFilePath = path.resolve('./task3/txt/result.txt');

const readStream = new fs.createReadStream(readFilePath, "utf8");
const writeStream = fs.createWriteStream(writeFilePath);

readStream.on("data", async function(chunk){
    const [ headers, ...rows ] = await convertDataFromCSVString(chunk);
    const resultJSON = rows.map( row => generateJSONRow( headers, row ));

    writeStream.write(resultJSON.join(''));

    writeStream.on('error', err => {
        console.error(err);
    });
});


readStream.on('error', err => {
    console.error(err);
});

readStream.on('end', function () {
    writeStream.end();
});