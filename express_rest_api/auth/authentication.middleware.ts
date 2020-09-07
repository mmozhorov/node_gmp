import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

import { serviceContainer } from "../config/inversify.config";
import { UsersService } from "../services/users.service";
import { DB, DBInterface } from "../types/db.types";

// @ts-ignore
const { JWT_KEY } = config().parsed;
const UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );

export const login = async ( { login = "", password = "" } ) => {
    const user = await UserServiceInstance.getUserByCredentials( login, password );

    if (user)
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            user: user.id},
            JWT_KEY
        );

    return null;
};
