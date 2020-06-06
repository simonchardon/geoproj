const express = require('express');
const router = express.Router();

const positionCtrl = require('../controllers/position');


router.post('/create',positionCtrl.update);

module.exports = router;