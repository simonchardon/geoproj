const express = require('express');
const router = express.Router();

const personsCtrl = require('../controllers/persons');
const positionCtrl = require('../controllers/position');

router.get('/', personsCtrl.index);

router.post('/create/', personsCtrl.create);

router.get('/:id/position', positionCtrl.show);

router.get('/:id/history',positionCtrl.index);

router.get('/:id/newposition/lat=:lat&long=:long',positionCtrl.update);


module.exports = router;
