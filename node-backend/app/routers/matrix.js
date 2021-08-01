const express = require('express');
const { getAllMatrix, addMatrix } = require('../controllers/matrixController');
const { catchErrors } = require('../helpers/catchError');


const router = express.Router();

router.get('/', catchErrors(getAllMatrix));
router.post('/', catchErrors(addMatrix));

module.exports = router;