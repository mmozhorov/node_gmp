import express = require('express');

import userRouter from './users.router';

const app: express.Application = express();

app.use(express.json());

app.use('/users', userRouter);

app.use(( err: any, req: express.Request, res: express.Response, next: any ) => {
    if (err)
        res.status(err.statusCode).json({
            message: err.message
        });
});

export default app;