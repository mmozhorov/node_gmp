import { Container } from 'inversify';
import { beforeAll } from '@jest/globals';

import { DBInterface, DB } from '../types/db.types';
import {User, UserServiceInterface} from '../types/user.types';
import { PostgresqlTest } from '../loaders/postgresql-test';
import { UsersService } from './users.service';

const LIMIT = 2;
const serviceContainer = new Container();
let UserServiceInstance: UserServiceInterface;

beforeAll(() => {
    serviceContainer.bind<DBInterface>(DB).to(PostgresqlTest);
    UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );
});

describe('UsersService/getUsersByLoginSubstr', () => {
    it('Check that we have array of users in default case', async () => {
        expect( Array.isArray(await UserServiceInstance.getUsersByLoginSubstr()) ).toEqual(true);
    });

    it('Check that we have array of users less or equal of limit param', async () => {
        // @ts-ignore
        expect( (await UserServiceInstance.getUsersByLoginSubstr('', LIMIT ))?.length <= LIMIT).toEqual(true);
    });
});
