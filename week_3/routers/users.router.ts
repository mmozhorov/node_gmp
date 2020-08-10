import express = require('express');

import UsersService from '../services/users.service';
import { createUserValidationMiddleware, updateUserValidationMiddleware } from '../utils/user-validation.middleware';
import { User, UserLimit } from "../types/user.types";
import {sortingByLoginASC} from "../utils/sortings";

const router = express.Router();

router.get('/', async ( req: express.Request, res: express.Response, next ) => {
    const { loginSubstringIn = '', limit = UserLimit.DEFAULT} = req.query;
    // @ts-ignore
    const users: User[] | null = await UsersService.getUsersByParams({ loginSubstringIn, limit });
    const sortedByASCUsers = sortingByLoginASC(users);

    if (users)
        return res.status(200).json({ users: sortedByASCUsers });

    return next({
       statusCode: 400,
       message: 'Bad request!'
    });
});

router.get('/:id', async ( req: express.Request, res: express.Response, next ) => {
    const { id } = req.params;
    const user: User | null = await UsersService.getUserById(id);

    if(user)
        return res.status(200).json({ user: {
                login: user.login,
                age: user.age
            }
        })
    return next({
        statusCode: 404,
        message: 'User not found!'
    });
});

router.post('/', createUserValidationMiddleware,( req: express.Request, res: express.Response, next ) => {
    const { login, password, age } = req.body;
});

router.put('/:id', updateUserValidationMiddleware,  ( req: express.Request, res: express.Response, next ) => {
    const { id } = req.params;
});

router.delete('/:id', ( req: express.Request, res: express.Response, next ) => {
    const { id } = req.params;
});

export default router;