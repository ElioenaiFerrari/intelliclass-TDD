const router = require('express').Router();
const index = require('./index');
const update = require('./update');
const show = require('./show');
const store = require('./store');
const destroy = require('./destroy');

router.get('/', index);
router.post('/', store);
router.get('/:id', show);
router.delete('/:id', destroy);
router.put('/:id', update);

module.exports = (app) => app.use('/users', router);
