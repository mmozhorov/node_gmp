import { Container } from 'inversify';
import { beforeAll } from '@jest/globals';
const faker = require('faker');

import { DBInterface, DB } from '../types/db.types';
import {User, UserServiceInterface} from '../types/user.types';
import { PostgresqlTest } from '../loaders/postgresql-test';
import { UsersService } from './users.service';
import { users } from '../config/dump.json';

const testUser = {
    login: faker.internet.userName(),
    password: faker.internet.password(),
    age: faker.random.number()
};
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
        it('Check that method returns to us one user with login, age and id params',  async () => {
            const user: User |  null = await UserServiceInstance.getUserById(users[0].id);
            expect(
                user &&
                user.id === users[0].id &&
                user?.login === users[0].login &&
                user?.age === users[0].age
            ).toEqual(true);
        });

        it('Check that we have null when try to call imagine id', async () => {
            const user: User |  null = await UserServiceInstance.getUserById('test');
            expect( user ).toEqual( null );
        });
    });

    describe('createUser', () => {
       it('Check that we have not desired user before creating', async () => {
           const noExistedUser: User[] |  null = await UserServiceInstance.getUserByCredentials( testUser.login, testUser.password );
           expect( noExistedUser?.length ).toBeFalsy();
       });

       it('Check right creating of user', async () => {
           const createdUser: User | undefined = await UserServiceInstance.createUser( testUser );
           expect( createdUser ).toBeTruthy();
       });

       it('Check searching of existed user', async () => {
           const searchedUser: User[] | null = await UserServiceInstance.getUserByCredentials( testUser.login, testUser.password );
           expect( searchedUser ).toBeTruthy();
       })
    });
});
