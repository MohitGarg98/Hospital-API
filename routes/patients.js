const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients_controller');

router.get('/register', patientsController.register);
router.get('/getpatient', patientsController.getPatient);
router.get('/:id/createreport', patientsController.createReport);
router.get('/getreports', patientsController.getReports);
router.get('/:id/allreports', patientsController.allReports);
router.get('/getstatus', patientsController.getStatus);
router.get('/logout', patientsController.logout);

router.post('/register', patientsController.registerPost);
router.post('/:id/createreport', patientsController.createReportPost);
router.post('/getpatient', patientsController.getPatientPost);
router.post('/getreports', patientsController.getReportsPost);
router.post('/getstatus', patientsController.getStatusPost);

module.exports = router;
