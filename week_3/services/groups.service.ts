import { v4 as uuidv4 } from 'uuid';

import { DBInterface } from '../types/db.types';
import { Group, GroupServiceInterface } from '../types/group.types';
import { GROUP_SCHEMA } from '../models/groups.model';
import { serviceLogger as log } from '../utils/logger.helpers';

class GroupsService implements GroupServiceInterface{
    private Group: any;

    constructor(Db: DBInterface) {
        this.Group = Db.client.define('Groups', GROUP_SCHEMA, { timestamps: false });
    }

    @log
    private async isGroupAlreadyExist( groupId: string | undefined): Promise<boolean> {
        if ( !groupId ) return false;

        return Boolean( await this.getGroupById( groupId ) );
    }

    @log
    async getGroupById(id: string) {
        return await this.Group.findOne({
            where: { id }
        });
    }

    @log
    async getAllGroups() {
        return await this.Group.findAll();
    }

    @log
    async createGroup( group:  Group ) {

        if (await this.isGroupAlreadyExist(group.id))
            return;

        return await this.Group.create({
            id: uuidv4(),
            name: group.name,
            permissions: group.permissions
        });
    }

    @log
    async updateGroup( group:  Group ){
        const { id } = group;

        if ( !await this.isGroupAlreadyExist(group.id) )
            return;

        const [, [ updatedGroup ] ] = await this.Group.update( { ...group }, { returning: true, where: { id } });

        return updatedGroup;
    }

    @log
    async removeGroup( id: string ){
        const desiredGroup = await this.getGroupById(id);
        if( desiredGroup )
            return await desiredGroup.destroy();

        return;
    }
}

export { GroupsService };
