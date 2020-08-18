const router = require('express').Router();
const UserController = require('./UserController');

router.get('/', UserController.index);
router.post('/', UserController.store);

module.exports = (app) => app.use('/users', router);
