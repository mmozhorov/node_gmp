import express = require('express');

import userRouter from './users.router';
import groupRouter from './groups.router';

const app: express.Application = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use(( err: any, req: express.Request, res: express.Response, next: any ) => {
    if (err.statusCode && err.message)
        return res.status(err.statusCode).json({
            message: err.message
        });
    return next(err);
});

app.use(( err: any, req: express.Request, res: express.Response, next: any ) => {
    console.log(err);

    return res.status(500).json({
        message: 'Something went wrong!'
    })
});

export default app;