import { Container } from 'inversify';
import { beforeAll } from '@jest/globals';

import { DBInterface, DB } from '../types/db.types';
import {User, UserServiceInterface} from '../types/user.types';
import { PostgresqlTest } from '../loaders/postgresql-test';
import { UsersService } from './users.service';
import { users } from '../config/dump.json';

const LIMIT = 2;
const serviceContainer = new Container();
let UserServiceInstance: UserServiceInterface;

beforeAll(() => {
    serviceContainer.bind<DBInterface>(DB).to(PostgresqlTest);
    UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );
});

describe('UsersService', () => {
    describe('getUsersByLoginSubstr', () => {
        it('Check that we have array of users with next params: id, login, age in default case', async () => {
            const users: User[] | null = await UserServiceInstance.getUsersByLoginSubstr();

            expect( Array.isArray( users ) ).toEqual(true);
            expect(
                users && users.every(
                ( item: User ) =>
                    typeof item.id === 'string' &&
                    typeof item.age === 'number' &&
                    typeof item.login === 'string'
                )
            ).toEqual(true);

        });

        it('Check that we have array of users less or equal of limit param', async () => {
            // @ts-ignore
            expect( (await UserServiceInstance.getUsersByLoginSubstr('', LIMIT ))?.length <= LIMIT).toEqual(true);
        });

        it('Check that searching by substring works correctly', async () => {
            const desiredUsers: User[] |  null = await UserServiceInstance.getUsersByLoginSubstr(users[1].login);
            expect(desiredUsers?.length && desiredUsers[0].id).toEqual(users[1].id);
        });
    });

    describe('getUserById', () => {
    });
});
