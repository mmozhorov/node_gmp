type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface Group {
    id: string,
    name: string,
    permissions: Array<Permission>
};

export interface GroupServiceInterface {
    getGroupById( id: string ): Promise<Group | null>,
    getAllGroups(): Promise<Group[] | null>,
    createGroup( group:  Group ): Promise<Group | null>,
    updateGroup( group:  Group ): Promise<Group | null>,
    removeGroup( id: string ): Promise<Error | null>
}

export const GroupType = Symbol.for('Group');