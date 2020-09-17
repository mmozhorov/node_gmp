import express from 'express';

import { serviceContainer } from '../config/inversify.config';
import { DB, DBInterface } from '../types/db.types';
import { UsersService } from '../services/users.service';
import { routerErrorLog } from '../utils/logger.helpers';

const router = express.Router();
const UserServiceInstance = new UsersService( serviceContainer.get<DBInterface>(DB) );

router.post('/', async ( req: express.Request, res: express.Response, next: any ) => {
    try{
        const { login , password } = req.body;
        const token: string | null = await UserServiceInstance.login( login, password );

        if ( token )
            return res.status(200).json( { token } );

        return next({
            statusCode: 403,
            message: 'Incorrect credentials!'
        });
    }
    catch( error ){
        next( routerErrorLog('POST /login', req.body, error ) );
    }
});

export default router;