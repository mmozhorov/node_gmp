import { users } from '../db/index.json';
import { User } from "../types/user.types";

export default class UsersService {
    public static getUserById( desiredId: string ): User | null{
        return users.find( ({ id, isDeleted }) => (id === desiredId) && !isDeleted) || null;
    }

    public static createUser(newUser : User){
        users.push(newUser);
    }
}