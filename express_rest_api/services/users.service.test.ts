import { Container } from 'inversify';
import { beforeAll } from '@jest/globals';

import { DBInterface, DB } from '../types/db.types';
import { PostgresqlTest } from '../loaders/postgresql-test';
import { UsersService } from './users.service';

const serviceContainer = new Container();
let UserServiceInstance;

beforeAll(() => {
    serviceContainer.bind<DBInterface>(DB).to(PostgresqlTest);
    UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );
});

describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });
});
