const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const getReversedString = ( line = '' ) => line.split('').reverse().join('');

process.stdin.on( 'line', function (line) {
    console.log(line)
} )

// rl.on('line', function(line = ''){
//     process.stdout.write(getReversedString(line));
// })