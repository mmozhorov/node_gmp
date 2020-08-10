import { Op } from 'sequelize';
import { v4 as uuidv4 } from "uuid";

import { DBService } from './DBService';
import { USER_SCHEMA } from '../models/user.model';
import { User } from "../types/user.types";
import { sortingByLoginASC } from "../utils/sortings";

class UsersService extends DBService{
    private User: any;

    constructor() {
        super();
        this.User = this.client.sequelize.define('users', USER_SCHEMA, { timestamps: false });
    }

    public async getUsersByParams( params: any ): Promise<any> {
        return await this.User.findAll( params );
    }

    public async getUsersByLoginSubstr(params: { loginSubstringIn?: string, limit?: number }): Promise<any> {
        const users = await this.getUsersByParams({
            where: {
                login: { [Op.like]: `%${params.loginSubstringIn}%` }
            },
            limit: params.limit
        });

        return sortingByLoginASC(users);
    }

    public async getUserById( id: string ): Promise<any> {
        return await this.User.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
    }

    public async createUser( user: User ): Promise<any> {
        const isUserAlreadyExist = this.getUsersByParams({
            where: {
                login: user.login
            }
        });

        if( isUserAlreadyExist )
            return;

        return await this.User.create({
            id: uuidv4(),
            login: user.login,
            password: user.password,
            age: user.age
        });
    }

}

const UserServiceInstance = new UsersService();

export default UserServiceInstance;