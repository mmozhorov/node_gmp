import express = require('express');
import { v4 as uuidv4 } from "uuid";

import UsersService from '../services/users.service';
import { User } from "../types/user.types";

const router = express.Router();

router.get('/:id', ( req: express.Request, res: express.Response ) => {
    const user: User | null = UsersService.getUserById(req.params.id);

    if (user)
        res.status(200).json({ "user": { name: user.login, age: user.age } });
    else
        res.status(404).json({ "message": "Not Found!" });
});

router.post('/', ( req: express.Request, res: express.Response ) => {
    const { login, password, age } = req.body;

    UsersService.createUser({
        id: uuidv4(),
        login,
        password,
        age,
        isDeleted: false
    });
});

export default router;