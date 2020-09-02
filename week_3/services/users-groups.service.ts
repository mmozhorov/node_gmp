import { DBInterface } from '../types/db.types';
import { UserGroupServiceInterface, UserGroup } from '../types/user-group.types';
import { USER_GROUP_SCHEMA } from '../models/users-groups.model';

class UsersGroupsService implements UserGroupServiceInterface{
    private UserGroup: any;
    private client: any;

    constructor(Db: DBInterface) {
        this.client = Db.client;
        this.UserGroup = Db.client.define('UserGroups', USER_GROUP_SCHEMA, { timestamps: false });
    }

    async addUsersToGroup( groupId: string, userIds: string[] ): Promise<UserGroup[]> {
        const usersGroup: UserGroup[] = [];

        await this.client.transaction(async (t: any) => {
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

    async removeUserRecords( userId: string ): Promise<any> {
        this.client.transaction(async (t: any) => {
            this.UserGroup.destroy({
                where: {
                    userId
                }
            }, { transaction: t });
        });
    }

    async removeGroupRecords ( groupId: string ): Promise<any> {
        this.client.transaction(async (t: any) => {
            this.UserGroup.destroy({
                where: {
                    groupId
                }
            }, { transaction: t });
        });
    }
}

export { UsersGroupsService };
