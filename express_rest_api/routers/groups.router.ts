import express from 'express';

import { serviceContainer } from '../config/inversify.config';

import { GroupsService } from '../services/groups.service';
import { UsersGroupsService } from '../services/users-groups.service';

import { DB, DBInterface } from '../types/db.types';
import { Group } from '../types/group.types';

import { createGroupValidationMiddleware, updateGroupValidationMiddleware } from '../validation/groups/group-validation.middleware';
import { routerErrorLog } from "../utils/logger.helpers";

const router = express.Router();

const GroupServiceInstance = new GroupsService( serviceContainer.get<DBInterface>(DB) );
const UsersGroupsServiceInstance = new UsersGroupsService( serviceContainer.get<DBInterface>(DB) );

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
        next( routerErrorLog('GET /groups', {}, error ) );
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
        next( routerErrorLog('GET /groups/:id', req.params, error ) );
    }
});

router.post('/', createGroupValidationMiddleware, async ( req: express.Request, res: express.Response, next ) => {
    try {
        const { name, permissions } = req.body;
        // @ts-ignore
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
        next( routerErrorLog('POST /groups', req.body, error ) );
    }
});

router.put('/:id', updateGroupValidationMiddleware, async ( req: express.Request, res: express.Response, next ) => {
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
        next( routerErrorLog('PUT /users/:id', { ...req.params, ...req.body }, error ) );
    }
});

router.delete('/:id', async ( req: express.Request, res: express.Response, next ) => {
    try{
        const { id } = req.params;

        const [ removedGroup ] = await Promise.all([
            await GroupServiceInstance.removeGroup( id ),
            await UsersGroupsServiceInstance.removeGroupRecords( id )
        ]);

        if( removedGroup )
            return res.status(200).json({
                message: 'Group successfully removed!'
            })
        return next({
            statusCode: 404,
            message: 'Group not found!'
        });
    }
    catch( error ){
        next( routerErrorLog('DELETE /groups/:id', req.params, error ) );
    }
});

export default router;