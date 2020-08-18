const router = require('express').Router();
const UserController = require('./UserController');

router.get('/', UserController.index);
router.post('/', UserController.store);
router.delete('/:id', UserController.destroy);

module.exports = (app) => app.use('/users', router);
