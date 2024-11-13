const express = require('express');
const router = express.Router();
const {registerPage, register, loginPage, login,dashboardPage} = require('../controllers/auth.controller')

router.get('/register', registerPage);
router.post('/register', register);
router.get('/login', loginPage);
router.post('/login', login);
router.get('/dashboard', dashboardPage);





module.exports = router;