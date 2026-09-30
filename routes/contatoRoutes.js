const express = require('express');
const router = express.Router();

const controller = require('../controllers/contatoController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', controller.listar);
router.post('/', controller.criar);

module.exports = router;
