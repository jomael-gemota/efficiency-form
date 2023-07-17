const express = require('express');
const key = require('ckey');
const cors = require('cors');

const userRouter = require('./api/user/user.router');
const formRouter = require('./api/form/form.router');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/form', formRouter);
app.use(cors());

app.use(express.static('client/build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Server Status: Port (${app.get('port')})`);
});