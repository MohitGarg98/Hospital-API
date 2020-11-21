const express = require('express');
const router = express.Router();
const doctorsControllers = require('../controllers/doctors_controller');

router.get('/login', doctorsControllers.login);
router.get('/register', doctorsControllers.register);
router.get('/home', doctorsControllers.home);
router.get('/createreport', doctorsControllers.createreport);
router.get('/reports/:status', doctorsControllers.status);

router.post("/register", doctorsControllers.registerPost);
router.post("/login", doctorsControllers.loginPost);

module.exports = router;