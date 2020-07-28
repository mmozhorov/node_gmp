export type User = {
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
};

export enum UserLimit {
    DEFAULT = '20',
    MIN = '10'
}