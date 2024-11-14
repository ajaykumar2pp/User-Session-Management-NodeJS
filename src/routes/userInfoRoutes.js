const express = require('express');
const router = express.Router();
const {userInfo, dashboardPage} = require('../controllers/userInfo.controller')


router.get('/user-info', userInfo);
router.get('/home', dashboardPage);



module.exports = router;