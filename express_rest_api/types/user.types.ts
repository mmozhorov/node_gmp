export interface User {
    id?: string,
    login: string,
    password: string,
    age?: number,
    isDeleted?: boolean
};

export enum UserLimit {
    DEFAULT = 20
}

export interface UserServiceInterface {
    getUsersByLoginSubstr( loginSubstringIn?: string, limit?: number ): Promise<User[] | null>,
    getUserByCredentials( login: string, password: string ): Promise<User | null>,
    login( login: string, password: string ): Promise<string | null>,
    getUserById( id: string ): Promise<User | null>,
    createUser( user: User ): Promise<User | undefined>,
    updateUser( user: User ): Promise<User | undefined>,
    deleteUser( id: string ): Promise<User | undefined>
}