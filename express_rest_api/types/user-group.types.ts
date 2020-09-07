export interface UserGroup {
    userId: string,
    groupId: string
}

export interface UserGroupServiceInterface {
    addUsersToGroup( groupId: string, userIds: string[] ): Promise<UserGroup[]>,
    removeUserRecords( userId: string ): Promise<any>,
    removeGroupRecords( groupId: string ): Promise<any>
}