const express = require('express');

const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/doctors', userController.getDoctors);

router.get('/appointments', userController.getAppointments);

router.post('/add-appointment', userController.addAppointment);

module.exports = router;
