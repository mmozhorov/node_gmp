import express = require('express');
import { v4 as uuidv4 } from "uuid";

import UsersService from '../services/users.service';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response ) => {
    const user = UsersService.getUserById(req.params.id);

    if (user)
        res.status(200).json({ "user": { name: user.login, age: user.age } });
    else
        res.status(404).json({ "message": "Not Found!" });
});

export default router;