import { Client } from 'pg';
import { config } from 'dotenv';

export class DB {
    private readonly conString: string;
    private readonly client: Client;

    constructor() {
        // @ts-ignore
        const { DB, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = config().parsed;
        this.conString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB}`;
        this.client = new Client(this.conString);
    }

    async connect(){
        await this.client.connect();
    }

    async disconnect(){
        await this.client.end();
    }
}