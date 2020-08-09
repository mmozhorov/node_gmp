import { DBService } from './DBService';
import { User } from "../types/user.types";
import { USER_SCHEMA } from '../models/user.model';

class UsersService extends DBService{
    private User: any;

    constructor() {
        super();
        this.User = this.client.sequelize.define('users', USER_SCHEMA, { timestamps: false });
    }

    public async getUsersByParams( params: any ) {
        return await this.User.findAll( { where: params } );
    }

}

const UserServiceInstance = new UsersService();

export default UserServiceInstance;