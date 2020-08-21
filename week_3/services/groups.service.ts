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

    async getGroupById(id: string): Promise<Group | null> {

    }
}

const GroupServiceInstance = new GroupsService();

export default GroupServiceInstance;
