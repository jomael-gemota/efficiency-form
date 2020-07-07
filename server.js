const express = require('express');
const key = require('ckey');

const userRouter = require('./api/user/user.router');
const formRouter = require('./api/form/form.router');

const app = express();
const port = key.SERVER_PORT;

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/form', formRouter);

app.listen(port, () => {
    console.log(`Server Status: Port (${port})`);
});