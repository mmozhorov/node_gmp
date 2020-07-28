// const fs = require('fs');
// const { pipeline, Duplex } = require('stream');
// const { promisify } = require('util');
// const path = require('path');
// const csv = require('csvtojson');
//
// const pipelineAsync = promisify(pipeline);
//
// async function convertDataFromCSVString( chunk ) {
//     return csv({ noheader: true, output: "csv" }).fromString(chunk);
// }
//
// function generateJSONRow( headers, row ) {
//     const result = {};
//     for ( let i = 0; i < headers.length; i++ ){
//         result[headers[i]] = row[i];
//     }
//     return JSON.stringify(result) + '\n';
// }
//
// const readStream = new fs.createReadStream(path.resolve('./task2/csv/example.csv'), "utf8");
// const writeStream = fs.createWriteStream(path.resolve('./task2/txt/result.txt'));
// async function * generate(source) {
//     for await (const chunk of source) {
//         yield chunk.toUpperCase();
//     }
// }
// const workingStream = Duplex.from(generate());
//
// async function run() {
//     await pipelineAsync(
//         readStream,
//         workingStream,
//         writeStream
//     );
//     console.log('Pipeline succeeded.');
// }
//
// run().catch(console.error);

const { pipeline } = require('stream');
const fs = require('fs');

const pipeline = util.promisify(stream.pipeline);
const fs = require('fs');

async function run() {
    await pipeline(
        fs.createReadStream('lowercase.txt'),
        async function* (source) {
            source.setEncoding('utf8');  // Work with strings rather than `Buffer`s.
            for await (const chunk of source) {
                yield chunk.toUpperCase();
            }
        },
        fs.createWriteStream('uppercase.txt')
    );
    console.log('Pipeline succeeded.');
}

run().catch(console.error);