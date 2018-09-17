const router = require('express').Router();

router.use('/todos', require('./api'));

module.exports = router;