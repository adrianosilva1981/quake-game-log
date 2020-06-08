const express = require('express');
const router = express.Router();
const gameLogController = require('../controllers/gameLogController')

router.get('/', gameLogController.readGameFile);
router.get('/:id', gameLogController.getGameResume);


module.exports = router;