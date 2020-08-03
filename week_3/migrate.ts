import { DBServiceInstance } from './services/DBService';

async function clearDatabase() {
}

async function fillDatabase() {
}

(async function migrate() {
    try {
        await DBServiceInstance.connect();
        const result = await DBServiceInstance.query(`
            CREATE TABLE users (
                email varchar,
                firstName varchar,
                lastName varchar,
                age int
            );`
        );
        console.log(result);

        console.info('successful migration');
    }
    catch( error ){
        console.error(error);
    }
})();
