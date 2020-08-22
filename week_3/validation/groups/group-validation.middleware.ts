import * as express from "express";

import { validate } from '../../utils/validate.helpers';
import * as schemas from './group.schema';

export const createGroupValidationMiddleware = (req: express.Request, res: express.Response, next: any) => {
    const errors = validate(req.body, schemas.createGroupSchema);
    return errors ? next({
        statusCode: 400,
        message: errors.map( (err: any) => err.message ).join(',')
    }): next();
};

export const updateGroupValidationMiddleware = (req: express.Request, res: express.Response, next: any) => {
    const errors = validate(req.body, schemas.updateGroupSchema);
    return errors ? next({
        statusCode: 400,
        message: errors.map( (err: any) => err.message ).join(',')
    }): next();
};