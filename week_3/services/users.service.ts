import { Op } from 'sequelize';

import { DBService } from './DBService';
import { USER_SCHEMA } from '../models/user.model';

class UsersService extends DBService{
    private User: any;

    constructor() {
        super();
        this.User = this.client.sequelize.define('users', USER_SCHEMA, { timestamps: false });
    }

    public async getUsersByParams( params: { loginSubstringIn: string, limit: number } ) {
        const loginSubstringInRegExp = `%${params.loginSubstringIn}%`;

        return await this.User.findAll( {
            where: {
                login: { [Op.like]: loginSubstringInRegExp }
                },
            limit: params.limit });
    }

}

const UserServiceInstance = new UsersService();

export default UserServiceInstance;