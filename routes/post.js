const express = require('express')
const router = express.Router();

//middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const postCtlr = require('../controllers/post');

router.get('/:id', auth, postCtlr.getPost);

router.post('/', auth, postCtlr.getAllPost);

router.post('/createPost', auth, postCtlr.createPost); 

router.delete('/:id', auth, postCtlr.deletePost)

module.exports = router;

// multer