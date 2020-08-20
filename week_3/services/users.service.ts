import { Op } from 'sequelize';
import { v4 as uuidv4 } from "uuid";

import { DBService } from './db.service';
import { USER_SCHEMA } from '../models/user.model';
import { User } from "../types/user.types";
import { sortingByLoginASC } from "../utils/sortings";

class UsersService extends DBService{
    private User: any;

    constructor() {
        super();
        this.User = this.client.sequelize.define('users', USER_SCHEMA, { timestamps: false });
    }

    private async isUserAlreadyExist( login: string ) {
        return Boolean((
            await this.getUsersByParams({
                where: { login, isDeleted: false }
            })
        ).length);
    }

    private async getUsersByParams( params: any ): Promise<any> {
        return await this.User.findAll( params );
    }

    public async getUsersByLoginSubstr(params: { loginSubstringIn?: string, limit?: number }): Promise<any> {
        const users = await this.getUsersByParams({
            where: {
                login: { [Op.like]: `%${params.loginSubstringIn}%` },
                isDeleted: false
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
        if( await this.isUserAlreadyExist( user.login ) )
            return;

        return await this.User.create({
            id: uuidv4(),
            login: user.login,
            password: user.password,
            age: user.age
        });
    }

    public async updateUser( user: User ): Promise<any> {
        const { id, login } = user;

        if( !await this.isUserAlreadyExist( login ) )
            return;

        const [, [ updatedUser ] ] = await this.User.update( { ...user }, { returning: true, where: { id } });

        return updatedUser;
    }

    public async deleteUser( id: string ): Promise<any> {
        const user = await this.getUserById( id );

        if ( !user )
            return;

        const [, [ updatedUser ] ] = await this.User.update( { isDeleted: true }, { returning: true, where: { id } });

        return updatedUser;
    }
}

const UserServiceInstance = new UsersService();

export default UserServiceInstance;