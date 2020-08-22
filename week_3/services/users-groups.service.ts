import { DBInterface } from '../types/db.types';
import { UserGroupServiceInterface, UserGroup } from '../types/user-group.types';
import { USER_GROUP_SCHEMA } from '../models/users-groups.model';

class UsersGroupsService implements UserGroupServiceInterface{
    private UserGroup: any;

    constructor(Db: DBInterface) {
        this.UserGroup = Db.client.define('UserGroup', USER_GROUP_SCHEMA, { timestamps: false });
    }

    private async getRecordByParams( groupId: string, userId: string ): Promise<any> {
        return await this.UserGroup.findOne({
            where: { groupId, userId }
        });
    }

    async addUsersToGroup(groupId: string, userIds: string[]): Promise<any> {
        const usersGroup: UserGroup[] = [];

        await this.UserGroup.transaction(async (t: any) => {
            for await ( let userId of userIds ) {
                usersGroup.push(
                    await this.UserGroup.create({
                        userId,
                        groupId
                    }, { transaction: t })
                );
            }
        });

        return usersGroup;
    }

    async removeUsersFromGroup(groupId: string, userIds: string[]): Promise<any> {
        await this.UserGroup.transaction(async (t: any) => {
            for await ( let userId of userIds ) {
                const record = await this.getRecordByParams( groupId, userId );

                record.destroy({}, { transaction: t });
            }
        });
    }
}

export { UsersGroupsService };
