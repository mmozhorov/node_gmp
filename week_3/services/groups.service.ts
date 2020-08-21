import { Op } from 'sequelize';
import { v4 as uuidv4 } from "uuid";

import { Group, GroupServiceInterface } from '../types/group.types';
import { DBInterface } from "../types/db.types";
import { GROUP_SCHEMA } from '../models/group.model';

class GroupsService implements GroupServiceInterface{
    private Group: any;

    constructor(Db: DBInterface) {
        this.Group = Db.client.define('groups', GROUP_SCHEMA, { timestamps: false });
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
        return await this.Group.create({
            id: uuidv4(),
            name: group.name,
            permissions: group.permissions
        });
    }

    async updateGroup( group:  Group ){
        const { id } = group;
        const [, [ updatedGroup ] ] = await this.Group.update( { ...group }, { returning: true, where: { id } });

        return updatedGroup;
    }

    async removeGroup( id: string ){
        const desiredGroup = await this.getGroupById(id);
        return await desiredGroup.destroy();
    }
}

export { GroupsService };
