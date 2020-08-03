import express from 'express';

const app = express();

app.use(express.json());

app.use(function (err: any, req: express.Request, res: express.Response, next: any) {
    res.status(err.statusCode).json({
        'message': err.message
    });
});

export default app;