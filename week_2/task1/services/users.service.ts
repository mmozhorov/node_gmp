import db from '../db/index.json';
import { User } from "../types/user.types";
import {sortingByLoginASC, sortingByMask} from "../utils/sortings";

const users = [...db.users];

export default class UsersService {
    public static getAutoSuggestUsers( loginSubstringIn: string, limit: string ): User[] | null {
        const sortedUsers  = sortingByLoginASC(users);
        // @ts-ignore
        return sortedUsers
            .filter( ( user: User, i: number) => sortingByMask(loginSubstringIn, user) && !user.isDeleted && Number(limit) > i )
            .map( ( { login, age } ) => ({ login, age }));
    }

    public static getUserById( desiredId: string ): User | null {
        return users.find( ({ id, isDeleted }) => (id === desiredId) && !isDeleted) || null;
    }

    public static createUser(newUser : User): string | null {
        if( users.push(newUser) )
            return newUser.id;

        return null;
    }

    public static updateUser( userId: string, user: User): any {
        const oldUser = UsersService.getUserById(userId);

        if (oldUser){
            const { login, password, age } = user;
            const newUser = {
                ...oldUser,
                login: login || oldUser.login,
                password: password || oldUser.password,
                age: age || oldUser.age
            }

            for( let i = 0; i < users.length; i++ )
                if (users[i].id === userId)
                    users.splice(i, 1, newUser);

                return {
                    login: newUser.login,
                    age: newUser.age
                };

        }

        return null;
    }

    public static removeUser(userId: string): boolean{
        for( let i = 0; i < users.length; i++ )
            if (users[i].id === userId)
                users.splice(i, 1);
            return true;
    }
}