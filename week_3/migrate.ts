const { config } = require('dotenv');

async function clearDatabase() {
}

async function fillDatabase() {
}

(async function migrate() {
    try {
        const env = config().parsed;


        console.info('successful migration');
    }
    catch( error ){
        console.error(error);
    }
})();
