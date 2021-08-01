const express = require('express');
const { getAccessToRoute,getAdminAccess } = require('../middlewares/authorization/auth');
const { catchErrors } = require('../helpers/catchError');
const { checkUserExist } = require('../middlewares/database/databaseErrorHelpers');
const { blockUser, deleteUser } = require('../controllers/adminController');
const router = express.Router();

router.use([catchErrors(getAccessToRoute),catchErrors(getAdminAccess)]);

router.get('/block/:id',catchErrors(checkUserExist), catchErrors(blockUser) );
router.delete('/user/:id',catchErrors(checkUserExist), catchErrors(deleteUser));

module.exports = router;