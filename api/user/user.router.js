const { createUser, getUserByUserEmail } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token.validation');

router.post('/createUser', createUser);
router.post('/login', getUserByUserEmail);

module.exports = router;