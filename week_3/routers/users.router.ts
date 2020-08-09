import express = require('express');
import { v4 as uuidv4 } from "uuid";

import UsersService from '../services/users.service';
import { createUserValidationMiddleware, updateUserValidationMiddleware } from '../utils/user-validation.middleware';
import { User, UserLimit } from "../types/user.types";

const router = express.Router();

router.get('/', ( req: express.Request, res: express.Response, next ) => {
    const { loginSubstringIn = '', limit = UserLimit.DEFAULT} = req.query;
    const users: User[] | null = UsersService.getAutoSuggestUsers(String(loginSubstringIn), String(limit));

    if (users)
        res.status(200).json({ "users": users });
    else
        return next({
            statusCode: 404,
            message: "User not found!"
        });
});

router.get('/:id', ( req: express.Request, res: express.Response ) => {
    const user: User | null = UsersService.getUserById(req.params.id);

    if (user)
        res.status(200).json({ "user": { login: user.login, age: user.age } });
    else
        res.status(404).json({ "message": "Not Found!" });
});

router.post('/', createUserValidationMiddleware,( req: express.Request, res: express.Response, next ) => {
    const { login, password, age } = req.body;

    const newUserId: string | null = UsersService.createUser({
        id: uuidv4(),
        login,
        password,
        age,
        isDeleted: false
    });

    if (newUserId)
        res.status(200).json({ newUserId });
    else
        return next({
            statusCode: 400,
            message: "User already exist!"
        });
});

router.put('/:id', updateUserValidationMiddleware,  ( req: express.Request, res: express.Response, next ) => {
    const id = req.params.id;

    const updatedUser: User | null = UsersService.updateUser(id, req.body);

    if (updatedUser)
        res.status(200).json({ "user": updatedUser });
    else
        return next({
            statusCode: 404,
            message: "User not found!"
        });
});

router.delete('/:id', ( req: express.Request, res: express.Response, next ) => {
    if (UsersService.removeUser(req.params.id))
        res.status(200).json({ "message": "User successfully removed" });
    else
        return next({
            statusCode: 404,
            message: "User not found!"
        });
});

export default router;