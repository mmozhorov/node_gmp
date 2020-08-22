export interface UserGroup {
    userId: string,
    groupId: string
}

export interface UserGroupServiceInterface {
    addUsersToGroup( groupId: string, userIds: string[] ): Promise<any>,
    removeUsersFromGroup( groupId: string, userIds: string[] ): Promise<any>
}