const express = require('express');
const router = express.Router();
const {registerPage, register, loginPage, login,logoutUser} = require('../controllers/auth.controller')

router.get('/register', registerPage);
router.post('/register', register);
router.get('/login', loginPage);
router.post('/login', login);
router.get('/logout',logoutUser);



module.exports = router;