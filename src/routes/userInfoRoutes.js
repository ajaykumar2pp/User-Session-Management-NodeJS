const express = require('express');
const router = express.Router();
const {userInfo} = require('../controllers/userInfo.controller')

router.get('/user-info', userInfo);




module.exports = router;