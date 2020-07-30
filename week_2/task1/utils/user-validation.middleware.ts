import * as express from "express";
import Ajv from 'ajv';

import * as schemas from '../validation/user.schema';

const ajv = new Ajv({ allErrors: true });

const validate = ( data: any, schema: any) => {
    const validateFunction = ajv.compile(schema);
    const isValid = validateFunction(data);
    return isValid ? null : validateFunction.errors;
};

export const createUserValidationMiddleware = (req: express.Request, res: express.Response, next: any) => {
    const errors = validate(req.body, schemas.createUserSchema);
    return errors ? next(errors): next();
};

export const updateUserValidationMiddleware = (req: express.Request, res: express.Response, next: any) => {
    const errors = validate(req.body, schemas.updateUserSchema);
    return errors ? next(errors): next();
};