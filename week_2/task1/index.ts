import express = require('express');
import bodyParser = require('body-parser');

import userRouter from './routers/users.router';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRouter);

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});