import express = require('express');

import UsersService from '../services/users.service';
import { createUserValidationMiddleware, updateUserValidationMiddleware } from '../utils/user-validation.middleware';
import { User, UserLimit } from "../types/user.types";

const router = express.Router();

router.get('/', async ( req: express.Request, res: express.Response, next ) => {
    const { loginSubstringIn = '', limit = UserLimit.DEFAULT} = req.query;
    res.status(200).json({
        data: await UsersService.getUsersByParams({  })
    })
});

router.get('/:id', ( req: express.Request, res: express.Response ) => {
    const { id } = req.params;
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