const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const commentCtlr = require('../controllers/comment');

router.get('/:id', auth, commentCtlr.getComment);

router.get('/allComments/:PostId', auth, commentCtlr.getAllComment);

router.post('/createComment', auth, commentCtlr.createComment);

router.delete('/deleteComment/:id', auth, commentCtlr.deleteComment);

module.exports = router;