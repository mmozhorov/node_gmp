import * as express from "express";
import jwt from 'jsonwebtoken';

export const authorization = async (req: express.Request, res: express.Response, next: any) => {
    const authHeader = req.header('Authorization');

    if ( authHeader ) {
        const token = authHeader.replace('Bearer ', '');
        const clockTimestamp = Math.floor(Date.now() / 1000);
        // @ts-ignore
        const { exp, user: userId } = jwt.decode(token);

        if ( exp < clockTimestamp ) {
            return next({
                statusCode: 403,
                message: 'Token Expired!'
            })
        } else {
            return next();
        }
    }

    return next({
        statusCode: 401,
        message: 'Token is incorrect!'
    });
};
