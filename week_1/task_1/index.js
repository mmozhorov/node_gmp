const getReversedString = ( line = '' ) => line.split('').reverse().join('');

process.stdin.on( 'data', function (line) {
    process.stdout.write(getReversedString(line.toString()));
} )