import { DBInterface } from '../types/db.types';
import { UserGroupServiceInterface } from '../types/user-group.types';
import { USER_GROUP_SCHEMA } from '../models/users-groups.model';

class UsersGroupsService implements UserGroupServiceInterface{
    private UserGroup: any;
    private client: any;

    constructor(Db: DBInterface) {
        this.client = Db.client;
        this.UserGroup = Db.client.define('UserGroups', USER_GROUP_SCHEMA, { timestamps: false });
    }

    async addUserToGroup(groupId: string, userId: string): Promise<any> {
        return await this.client.transaction(async (t: any) => {
            await this.UserGroup.create({ userId, groupId }, { transaction: t });
        });
    }

    async removeUserFromGroups( userId: string ): Promise<any> {
        this.client.transaction(async (t: any) => {
            this.UserGroup.destroy({
                where: {
                    userId
                }
            }, { transaction: t });
        });
    }
}

export { UsersGroupsService };
