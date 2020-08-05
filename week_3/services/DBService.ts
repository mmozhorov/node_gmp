import { DB } from '../loaders/postgresql';

class DBService{
    private readonly client: any;

    constructor(DB: any) {
        this.client = new DB();
    }

    async connect() {
        return this.client.connect();
    }

    async query( query: string ) {
        return this.client.query(query);
    }
}

export const DBServiceInstance = new DBService(DB);