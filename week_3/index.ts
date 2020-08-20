import http from 'http';
import { config } from 'dotenv';

import { serviceContainer } from './config/inversify.config';
import { DBInterface, DB } from "./types/db.types";
import app from './routers';

(async function main() {
    try{
        const DBInstance = serviceContainer.get<DBInterface>(DB);

        await DBInstance.connect();
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