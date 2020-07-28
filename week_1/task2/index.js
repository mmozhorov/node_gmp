const fs = require('fs');
const { pipeline, Duplex, Transform } = require('stream');
const { promisify } = require('util');
const path = require('path');
const csv = require('csvtojson');

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
//
const readStream = new fs.createReadStream(path.resolve('./task2/csv/example.csv'), "utf8");
const writeStream = fs.createWriteStream(path.resolve('./task2/txt/result.txt'));

const processStream = new Transform({
    transform(chunk, encoding, callback){
        console.log(chunk.toString());
        callback(null, chunk);

    },

    flush(callback){
        callback();
    }
});

readStream.pipe(processStream).pipe(writeStream);