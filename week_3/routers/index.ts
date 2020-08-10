import express = require('express');

import userRouter from './users.router';

const app: express.Application = express();

app.use(express.json());

app.use('/users', userRouter);

app.use(( err: any, req: express.Request, res: express.Response, next: any ) => {
    if (err.statusCode && err.message)
        return res.status(err.statusCode).json({
            message: err.message
        });

    console.log(err);
});

export default app;