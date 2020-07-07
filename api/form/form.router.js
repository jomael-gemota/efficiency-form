const { insertFormResponse } = require('./form.controller');
const router = require('express').Router();

router.post('/insertFormResponse', insertFormResponse);

module.exports = router;