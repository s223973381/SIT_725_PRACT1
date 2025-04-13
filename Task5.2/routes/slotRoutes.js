const express = require('express');
const router = express.Router();
const controller = require('../controllers/slotController');

router.get('/', controller.homePage);
router.post('/book', controller.bookSlot);

module.exports = router;
