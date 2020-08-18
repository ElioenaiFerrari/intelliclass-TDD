const router = require('express').Router();
const UserController = require('./UserController');

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', UserController.store);
router.delete('/:id', UserController.destroy);
router.put('/:id', UserController.update);

module.exports = (app) => app.use('/users', router);
