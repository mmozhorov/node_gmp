import { DBServiceInstance } from './services/DBService';

async function clearDatabase() {
    return Promise.all([
        await DBServiceInstance.query(`DROP TABLE public.users;`)
    ]);
}

async function fillDatabase() {
    return Promise.all([
        await DBServiceInstance.query(`
            CREATE TABLE public.users(
                email text COLLATE pg_catalog."default" NOT NULL,
                firstname text COLLATE pg_catalog."default" NOT NULL,
                lastname text COLLATE pg_catalog."default",
                age integer,
                password text COLLATE pg_catalog."default" NOT NULL
                )
                WITH ( OIDS = FALSE )`
        )
    ]);
}

(async function migrate() {
    try {
        await DBServiceInstance.connect();
        await clearDatabase();

        console.log(await DBServiceInstance.query(`select * from users`));

        console.info('successful migration');
    }
    catch( error ){
        console.error(error);
    }
})();
