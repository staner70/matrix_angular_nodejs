const express = require('express');
const { getSingleUser,getAllUsers } = require('../controllers/userController.js');
const { catchErrors } = require('../helpers/catchError');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.get('/:id', catchErrors(checkUserExist), catchErrors(getSingleUser));
router.get('/', catchErrors(getAllUsers));


module.exports = router;