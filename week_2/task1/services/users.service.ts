import { users } from '../db/index.json';

export default class UsersService {
    public static getUserById( desiredId: string ){
        return users.find( ({ id, isDeleted }) => (id === desiredId) && !isDeleted) || null;
    }
}