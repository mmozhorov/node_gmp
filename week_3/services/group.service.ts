import { Op } from 'sequelize';
import { v4 as uuidv4 } from "uuid";

import { DBService } from './db.service';
import { GROUP_SCHEMA } from '../models/group.model';
import { Group } from '../types/group.types';

class GroupService extends DBService{
    private Group: any;
}

const GroupServiceInstance = new GroupService();

export default GroupServiceInstance;
