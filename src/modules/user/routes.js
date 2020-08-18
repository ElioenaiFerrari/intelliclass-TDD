const router = require('express').Router();

router.get('/');

module.exports = (app) => app.use('/users', router);
