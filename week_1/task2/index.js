const util = require('util');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

async function getDataFromCSVFile( path = '' ) {
    return await csv().fromFile(path);
}

async function writeDataToTXTFile() {
    //fs.writeFile(  )
}

(async function main() {
    try{

    }
    catch (error) {
        console.trace(error);
    }
}());

const filePath = path.resolve('./task2/csv/example.csv');
//const data = await getDataFromCSVFile(filePath);
const stream = new fs.ReadStream(filePath);

stream.on('readable', function(){
    const data = stream.read();

    if(data != null)
        console.log(data.toString());
});

stream.on('end', function(){
    console.log("THE END");
});
