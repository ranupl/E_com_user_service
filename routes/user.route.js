const express = require('express');
const { signUp, login, getAllUsers } = require('../controller/user.controller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/users', getAllUsers);

module.exports = router;
