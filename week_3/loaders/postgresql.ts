const Sequelize = require('sequelize');
import { config } from 'dotenv';

export class DB {
    private readonly sequelize: any;

    constructor() {
        // @ts-ignore
        const { DB, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = config().parsed;
        // @ts-ignore
        this.sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB}`);
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async query( query: string ) {
        return await this.sequelize.query(query);
    }

}