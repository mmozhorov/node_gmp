import express = require('express');

import UsersService from '../services/users.service';
import { createUserValidationMiddleware, updateUserValidationMiddleware } from '../utils/user-validation.middleware';
import { User, UserLimit } from "../types/user.types";

const router = express.Router();

router.get('/', async ( req: express.Request, res: express.Response, next ) => {
    try {
        const { loginSubstringIn = '', limit = UserLimit.DEFAULT} = req.query;
        // @ts-ignore
        const users: User[] | null = await UsersService.getUsersByLoginSubstr({ loginSubstringIn, limit });

        if ( users )
            return res.status(200).json({ users });

        return next({
            statusCode: 400,
            message: 'Bad request!'
        });
    }
    catch( error ){
        next(error);
    }
});

router.get('/:id', async ( req: express.Request, res: express.Response, next ) => {
    try {
        const { id } = req.params;
        const user: User | null = await UsersService.getUserById(id);

        if( user )
            return res.status(200).json({ user: {
                    login: user.login,
                    age: user.age
                }
            })
        return next({
            statusCode: 404,
            message: 'User not found!'
        });
    }
    catch( error ){
        next(error);
    }
});

router.post('/', createUserValidationMiddleware, async ( req: express.Request, res: express.Response, next ) => {
    try{
        const { login, password, age } = req.body;
        const user = await UsersService.createUser({ login, password, age });

        if( user )
            return res.status(200).json({ user: {
                    id: user.id,
                    login: user.login,
                    age: user.age
                }
            })

        return next({
            statusCode: 400,
            message: 'User is already exists!'
        });
    }
    catch( error ){
        next(error);
    }
});

router.put('/:id', updateUserValidationMiddleware, async ( req: express.Request, res: express.Response, next ) => {
    const { id } = req.params;
    try{
        const updatedUser = await UsersService.updateUser({ id, ...req.body });

        if( updatedUser )
            return res.status(200).json({ user: {
                    id: updatedUser.id,
                    login: updatedUser.login,
                    age: updatedUser.age
                }
            });

        return next({
            statusCode: 404,
            message: 'User not found!'
        });
    }
    catch( error ){
        next(error);
    }
});

router.delete('/:id', ( req: express.Request, res: express.Response, next ) => {
    try{
        const { id } = req.params;
    }
    catch( error ){
        next(error);
    }
});

export default router;