import { v4 as uuidv4 } from 'uuid';

import { Group, GroupServiceInterface } from '../types/group.types';
import { DBInterface } from "../types/db.types";
import { GROUP_SCHEMA } from '../models/groups.model';

class GroupsService implements GroupServiceInterface{
    private Group: any;

    constructor(Db: DBInterface) {
        this.Group = Db.client.define('Groups', GROUP_SCHEMA, { timestamps: false });
    }

    private async isGroupAlreadyExist( groupId: string | undefined): Promise<boolean> {
        if ( !groupId ) return false;

        return Boolean( await this.getGroupById( groupId ) );
    }

    async getGroupById(id: string) {
        return await this.Group.findOne({
            where: { id }
        });
    }

    async getAllGroups() {
        return await this.Group.findAll();
    }

    async createGroup( group:  Group ) {

        if (await this.isGroupAlreadyExist(group.id))
            return;

        return await this.Group.create({
            id: uuidv4(),
            name: group.name,
            permissions: group.permissions
        });
    }

    async updateGroup( group:  Group ){
        const { id } = group;

        if ( !await this.isGroupAlreadyExist(group.id) )
            return;

        const [, [ updatedGroup ] ] = await this.Group.update( { ...group }, { returning: true, where: { id } });
        console.log(await this.Group.update( { ...group }, { returning: true, where: { id } }));

        return updatedGroup;
    }

    async removeGroup( id: string ){
        const desiredGroup = await this.getGroupById(id);
        if( desiredGroup )
            return await desiredGroup.destroy();

        return;
    }
}

export { GroupsService };
