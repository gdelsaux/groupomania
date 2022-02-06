const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const likeCtlr = require('../controllers/like');

router.post('/like', auth, likeCtlr.like);

router.delete('/delete/:id', auth, likeCtlr.delete);

module.exports = router;