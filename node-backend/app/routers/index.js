const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
const admin = require('./admin');
const matrix = require('./matrix');
const { errorHandler } = require('../middlewares/customErrorHandler');


router.use('/api/auth', auth);
router.use('/api/users', user);
router.use('/api/admin', admin);
router.use('/api/matrix', matrix);


router.use(errorHandler);

module.exports = router;