import { Container } from 'inversify';
import { beforeAll } from '@jest/globals';
const faker = require('faker');

import { DBInterface, DB } from '../types/db.types';
import { Group, GroupServiceInterface } from '../types/group.types';
import { PostgresqlTest } from '../loaders/postgresql-test';
import { GroupsService } from './groups.service';
import { groups } from '../config/dump.json';

const testingGroup = groups[2];

const testGroup: Group = {
    name: faker.internet.userName(),
    permissions: [ "READ", "WRITE" ]
};

const updatedTestGroup: Group = {
    name: testGroup.name,
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
    describe('getAllGroups', async () => {
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

    describe('createGroup', async () => {
        it('Check that we have not desired user before creating', async () => {
            const groups: Group[] | null = await GroupsServiceInstance.getAllGroups();
            expect( groups?.find( group => group.name === testGroup.name )).toBeFalsy();
        });

        it('Check correct creating of group', async () => {
            const createdGroup: Group | null = await GroupsServiceInstance.createGroup( testGroup );
            expect( createdGroup ).toBeTruthy();
        });

        it('Check that we have desired user after creating', async () => {
            const groups: Group[] | null = await GroupsServiceInstance.getAllGroups();
            expect( groups?.find( group => group.name === testGroup.name )).toBeTruthy();
        });
    });

    describe('updateGroup', async () => {
        it('Check that we have not desired group info before updating', async () => {
            const group: Group | null = await GroupsServiceInstance.getGroupById( testingGroup.id );
            expect( group?.name ).toEqual( testGroup.name );
        });

        it('Check correct updating of group', async () => {
            const updatedGroup: Group | null = await GroupsServiceInstance.updateGroup( updatedTestGroup );
            expect( updatedGroup ).toBeTruthy();
        });

        it('Check that we have desired group info after updating', async () => {
            const groups: Group[] | null = await GroupsServiceInstance.getAllGroups();
            expect( groups?.find( group =>
                group.name === updatedTestGroup.name &&
                ( JSON.stringify(group.permissions) === JSON.stringify(updatedTestGroup.permissions) )
            )).toBeTruthy();
        });
    })
});
