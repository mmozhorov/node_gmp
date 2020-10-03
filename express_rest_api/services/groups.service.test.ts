import { Container } from 'inversify';
import { beforeAll } from '@jest/globals';
const faker = require('faker');

import { DBInterface, DB } from '../types/db.types';
import { Group, GroupServiceInterface } from '../types/group.types';
import { PostgresqlTest } from '../loaders/postgresql-test';
import { GroupsService } from './groups.service';
import { groups } from '../config/dump.json';

const testingGroup = groups[2];

const testGroup = {
    name: faker.internet.userName(),
    permissions: [ "READ", "WRITE" ]
};

const updatedTestGroup = {
    permissions: [ "SHARE", "WRITE" ]
};

const LIMIT = 2;
const serviceContainer = new Container();
let GroupsServiceInstance: GroupServiceInterface;

beforeAll(() => {
    serviceContainer.bind<DBInterface>(DB).to(PostgresqlTest);
    GroupsServiceInstance = new GroupsService( serviceContainer.get<DBInterface>(DB) );
});

describe('GroupsService', () => {
    describe('getAllGroups', () => {
        it('Check that we have array of users with next params: id, login, age in default case', async () => {
            const groups: Group[] | null = await GroupsServiceInstance.getAllGroups();

            expect( Array.isArray( groups ) ).toEqual(true);
            expect(
                groups && groups.every(
                ( item: Group ) =>
                    typeof item.id === 'string' &&
                    typeof item.name === 'string' &&
                    typeof item.permissions === 'object'
                )
            ).toEqual(true);

        });
    });
});
