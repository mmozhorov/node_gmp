import express from 'express';

import { serviceContainer } from '../config/inversify.config';

import { GroupsService } from '../services/groups.service';

import { DB, DBInterface } from '../types/db.types';
import { Group } from '../types/group.types';

const router = express.Router();
const DBInstance = serviceContainer.get<DBInterface>(DB);
const GroupServiceInstance = new GroupsService(DBInstance);

router.get('/', async ( req: express.Request, res: express.Response, next ) => {
    try {
        const groups: Group[] = await GroupServiceInstance.getAllGroups();

        if ( groups )
            return res.status(200).json({ groups });

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
        const group: Group | null = await GroupServiceInstance.getGroupById(id);

        if( group )
            return res.status(200).json({
                group: {
                    id: group.id,
                    name: group.name,
                    permissions: group.permissions
                }
            });
        return next({
            statusCode: 404,
            message: 'Group not found!'
        });
    }
    catch( error ){
        next(error);
    }
});

router.post('/', async ( req: express.Request, res: express.Response, next ) => {
    try {
        const { name, permissions } = req.body;
        const newGroup = await GroupServiceInstance.createGroup({ name, permissions });

        if( newGroup )
            return res.status(200).json({ group: {
                    id: newGroup.id,
                    name: newGroup.name,
                    permissions: newGroup.permissions
                }
            })

        return next({
            statusCode: 400,
            message: 'Group is already exists!'
        });
    }
    catch( error ){
        next(error);
    }
});

router.put('/:id', async ( req: express.Request, res: express.Response, next ) => {
    const { id } = req.params;
    try {
        const { name, permissions } = req.body;
        const updatedGroup = await GroupServiceInstance.updateGroup({ id, name, permissions });

        if( updatedGroup )
            return res.status(200).json({ group: {
                    id: updatedGroup.id,
                    name: updatedGroup.name,
                    permissions: updatedGroup.permissions
                }
            })

        return next({
            statusCode: 404,
            message: 'Group not found!'
        });
    }
    catch( error ){
        next(error);
    }
});

router.delete('/:id', async ( req: express.Request, res: express.Response, next ) => {
    try{
        const { id } = req.params;
        const result = await GroupServiceInstance.removeGroup( id );

        if( result )
            return res.status(200).json({
                message: 'Group successfully removed!'
            })
        return next({
            statusCode: 404,
            message: 'Group not found!'
        });
    }
    catch( error ){
        next(error);
    }
});

export default router;