import { Op } from 'sequelize';

import { DBService } from './DBService';
import { USER_SCHEMA } from '../models/user.model';
import {User} from "../types/user.types";

class UsersService extends DBService{
    private User: any;

    constructor() {
        super();
        this.User = this.client.sequelize.define('users', USER_SCHEMA, { timestamps: false });
    }

    public async getUsersByParams( params: { loginSubstringIn: string, limit: number } ): Promise<any> {
        const loginSubstringInRegExp = `%${params.loginSubstringIn}%`;

        return await this.User.findAll( {
            where: {
                login: { [Op.like]: loginSubstringInRegExp }
                },
            limit: params.limit });
    }

    public async getUserById( id: string ): Promise<any> {
        return await this.User.findOne({
            where: {
                id,
                isDeleted: false
            }
        });
    }

}

const UserServiceInstance = new UsersService();

export default UserServiceInstance;