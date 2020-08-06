import express = require('express');

import userRouter from './routers/users.router';

const app: express.Application = express();

app.use(express.json());

app.use('/users', userRouter);

app.use(( err: any, req: express.Request, res: express.Response, next: any ) => {
    if (err)
        res.status(err.statusCode).json({
            message: err.message
        });
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});