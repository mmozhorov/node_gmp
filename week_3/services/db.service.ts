import { DB } from '../loaders/postgresql';

export class DBService{
    protected readonly client: any;

    constructor() {
        this.client = new DB();
    }

    async connect() {
        return this.client.connect();
    }
}