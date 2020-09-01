import { Op } from 'sequelize';
import { v4 as uuidv4 } from "uuid";
import { injectable } from 'inversify';
import 'reflect-metadata';

import { USER_SCHEMA } from '../models/users.model';
import { User, UserServiceInterface } from "../types/user.types";
import { sortingByLoginASC } from "../utils/sortings";
import { DBInterface } from "../types/db.types";

@injectable()
class UsersService implements UserServiceInterface{
    private User: any;

    constructor( Db: DBInterface ) {
        this.User = Db.client.define('Users', USER_SCHEMA, { timestamps: false });
    }

    private async isUserAlreadyExist( login: string ) {
        return Boolean((
            await this.getUsersByParams({
                where: { login, isDeleted: false },
                attributes: [ 'id' ],
            })
        ).length);
    }

    private async getUsersByParams( params: any ) {
        return await this.User.findAll( params );
    }

    public async getUsersByLoginSubstr(params: any) {
        const users = await this.getUsersByParams({
            where: {
                login: { [Op.like]: `%${params.loginSubstringIn}%` },
                isDeleted: false
            },
            attributes: ['id', 'login', 'age'],
            limit: params.limit
        });

        return sortingByLoginASC(users);
    }

    public async getUserById( id: string ) {
        return await this.User.findOne({
            where: {
                id,
                isDeleted: false
            },
            attributes: ['id', 'login', 'age'],
        });
    }

    public async createUser( user: User ) {
        if( await this.isUserAlreadyExist( user.login ) )
            return;

        return await this.User.create({
            id: uuidv4(),
            login: user.login,
            password: user.password,
            age: user.age
        });
    }

    public async updateUser( user: User ) {
        const { id, login } = user;

        if( !await this.isUserAlreadyExist( login ) )
            return;

        const [, [ updatedUser ] ] = await this.User.update( { ...user }, { returning: true, where: { id } });

        return updatedUser;
    }

    public async deleteUser( id: string ) {
        const user = await this.getUserById( id );

        if ( !user )
            return;

        const [, [ updatedUser ] ] = await this.User.update( { isDeleted: true }, { returning: true, where: { id } });

        return updatedUser;
    }
}

export { UsersService };