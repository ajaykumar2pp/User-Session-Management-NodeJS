const express = require('express');
const router = express.Router();
const {userInfo, dashboardPage, myCoursePage} = require('../controllers/user-Info.controller')
const {isVerifiedUser} = require('../middlewares/auth.middleware')

router.get('/user-info',isVerifiedUser, userInfo);
router.get('/home', dashboardPage);
router.get('/my-course',isVerifiedUser, myCoursePage);


module.exports = router;