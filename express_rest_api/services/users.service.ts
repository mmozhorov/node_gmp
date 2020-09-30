import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { config } from 'dotenv';
import 'reflect-metadata';

import { USER_SCHEMA } from '../models/users.model';
import { User, UserServiceInterface } from '../types/user.types';
import { DBInterface } from '../types/db.types';
import { sortingByLoginASC } from '../utils/sortings';
import { serviceLogger as log } from '../utils/logger.helpers';
import jwt from "jsonwebtoken";

@injectable()
class UsersService implements UserServiceInterface{
    private User: any;

    constructor( Db: DBInterface ) {
        this.User = Db.client.define('Users', USER_SCHEMA, { timestamps: false });
    }

    @log
    private async isUserAlreadyExist( login: string ) {
        return Boolean((
            await this.getUsersByParams({
                where: { login, isDeleted: false },
                attributes: [ 'id' ],
            })
        ).length);
    }

    @log
    private async getUsersByParams( params: any ) {
        return await this.User.findAll( params );
    }

    @log
    public async login( login: string, password: string ) {
        // @ts-ignore
        const { JWT_KEY } = config().parsed;
        const [ user ] = await this.getUserByCredentials( login, password );

        if (user)
            return jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    user: user.id},
                JWT_KEY
            );

        return null;
    }

    @log
    public async getUserByCredentials( login: string, password: string ) {
        return await this.getUsersByParams({
            where: {
                login,
                password,
                isDeleted: false
            }
        })
    }

    @log
    public async getUsersByLoginSubstr(params: any) {
        const { loginSubstringIn = '', limit = 20 } = params;
        const users = await this.getUsersByParams({
            where: {
                login: { [Op.like]: `%${ loginSubstringIn }%` },
                isDeleted: false
            },
            attributes: ['id', 'login', 'age'],
            limit
        });

        return sortingByLoginASC(users);
    }

    @log
    public async getUserById( id: string ) {
        return await this.User.findOne({
            where: {
                id,
                isDeleted: false
            },
            attributes: ['id', 'login', 'age'],
        });
    }

    @log
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

    @log
    public async updateUser( user: User ) {
        const { id, login } = user;

        if( !await this.isUserAlreadyExist( login ) )
            return;

        const [, [ updatedUser ] ] = await this.User.update( { ...user }, { returning: true, where: { id } });

        return updatedUser;
    }

    @log
    public async deleteUser( id: string ) {
        const user = await this.getUserById( id );

        if ( !user )
            return;

        const [, [ updatedUser ] ] = await this.User.update( { isDeleted: true }, { returning: true, where: { id } });

        return updatedUser;
    }
}

export { UsersService };