const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect')

const {signup,signin,getAllUsers} = require('../controllers/user.controller')
router.get('/users',protect,getAllUsers);
router.post('/signup',signup);
router.post('/signin',signin);

module.exports = router;