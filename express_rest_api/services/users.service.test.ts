import { Container } from 'inversify';
import { beforeAll } from '@jest/globals';

import { DBInterface, DB } from '../types/db.types';
import { UserServiceInterface } from '../types/user.types';
import { PostgresqlTest } from '../loaders/postgresql-test';
import { UsersService } from './users.service';

const serviceContainer = new Container();
let UserServiceInstance: UserServiceInterface;

beforeAll(() => {
    serviceContainer.bind<DBInterface>(DB).to(PostgresqlTest);
    UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );
});

describe('My Test Suite', () => {
    it('My Test Case', async () => {
        console.log(await UserServiceInstance.getUsersByLoginSubstr({}));
        expect(true).toEqual(true);
    });
});
