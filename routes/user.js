const express = require('express')
const router = express.Router();

const isAdmin = require('../middleware/isAdmin')
const auth = require('../middleware/auth');

const userCtlr = require('../controllers/user');

//admin can look at all users
router.put('/admin/:id', userCtlr.getAllUsers);

//get a user
router.get('/info/:id', auth, userCtlr.getOneUser);

//signup or create for admin
router.post('/createUser', userCtlr.createUser, userCtlr.login);

//login
router.post('/login', userCtlr.login);

//update user
router.put('/updateUser/:id', auth, userCtlr.updateUser);

//delete user
router.delete('/admin/:id', auth, userCtlr.deleteUser);

module.exports = router;