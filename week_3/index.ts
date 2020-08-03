import http from 'http';
import { config } from 'dotenv';

import app from './routers';
import { DBServiceInstance } from './services/DBService';

(async function main() {
    try{
        await DBServiceInstance.connect();
        console.log("Successfully connected to db!");

        // @ts-ignore
        const { APP_PORT } = config().parsed;
        const server = http.createServer(app);

        server.listen(APP_PORT, function () {
            console.info(`Server is running on ${APP_PORT} port!`);
        })
    }
    catch (error) {
        console.error(error);
    }
}());