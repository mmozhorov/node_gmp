import http from 'http';
import { config } from 'dotenv';

import { serviceContainer } from './config/inversify.config';
import { DBInterface, DB } from "./types/db.types";
import { LoggerInterface, Logger } from "./types/logger.types";
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

            process.on('uncaughtException', function ( err: Error ) {
                serviceContainer.get<LoggerInterface>(Logger)
                    .logServiceRequest(`Error type: ${ err.name }\nError message: ${ err.message }\nError trace: ${ err.stack }`
                    );
            });

            process.on('unhandledRejection', function ( reasonany: any, p: Promise<any> ) {
                serviceContainer.get<LoggerInterface>(Logger)
                    .logServiceRequest( `Error type: Promise unha${reasonany} ${p} `);
            });
        })
    }
    catch (error) {

        console.error(error);
    }
}());

setTimeout(() => { Promise.reject("lllkkkjhhjjh") }, 6000);