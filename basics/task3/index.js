import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { pipeline, Transform } from 'stream';


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

const readStream = new fs.createReadStream(path.resolve('./task3/csv/example.csv'), "utf8");
const writeStream = fs.createWriteStream(path.resolve('./task3/txt/result.txt'));

let headers = null;

const processStream = new Transform({
    async transform(chunk, encoding, callback){
        let rows = await convertDataFromCSVString(chunk.toString());

        if ( !headers ){
            headers = rows[0];
            rows.splice(0,1);
        }

        const resultJSON = rows.map( row => generateJSONRow( headers, row ));
        callback(null, resultJSON.join(''));

    },
    flush(callback){
        callback();
    }
});

pipeline(
    readStream,
    processStream,
    writeStream,
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);