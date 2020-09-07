import * as express from "express";
import jwt from 'jsonwebtoken';

export const authorization = async (req: express.Request, res: express.Response, next: any) => {
    const authHeader = req.header('Authorization');

    console.log(authHeader);

    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        const clockTimestamp = Math.floor(Date.now() / 1000);
        const decoded = jwt.decode(token);
        //const exp = _.get(decoded, 'exp');
        console.log(decoded);

        if (0 < clockTimestamp) {
            res.status(401).json({
                "message": "Token Expired"
            });
        } else {
            next();
        }
    } else {
        res.status(401).json({ "message": "Token is incorrect" });
    }
};
