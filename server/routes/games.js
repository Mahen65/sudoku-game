const express = require('express');
const router = express.Router();
const { saveGame, loadGame } = require('../controllers/games');
const { ensureAuth } = require('../middleware/auth');

router.post('/save', ensureAuth, saveGame);
router.get('/load', ensureAuth, loadGame);

module.exports = router;
