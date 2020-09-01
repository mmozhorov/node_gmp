export interface UserGroup {
    userId: string,
    groupId: string
}

export interface UserGroupServiceInterface {
    addUserToGroup( groupId: string, userId: string ): Promise<any>,
    removeUserFromGroups( userId: string ): Promise<any>
}