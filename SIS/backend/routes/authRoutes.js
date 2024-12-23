const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/admin-register', authController.registerAdmin);
router.post('/admin-login', authController.adminLogin);
router.post('/student-register', authController.registerStudent);
router.post('/student-login', authController.studentLogin);
router.post('/fetch-student', authController.fetchStudent);
router.post('/fetch-admin', authController.fetchAdmin);
router.get('/student-details', authController.StudentDetails);
router.put('/student-verified/:id', authController.StudentDetailsverify);
router.put('/edit-student/:id', authController.editStudent);
router.post('/post-marks', authController.postMarks);
router.get('/get-marks', authController.getStudentMarks);
router.get('fetch-student', authController.applyForLeave)
router.post('/student-leave', authController.applyForLeave);
router.get('/leave-request', authController.leaveRequest);
router.put('/leave-requests/:id/approve', authController.approveLeave);
router.post('/generate-hall-ticket', authController.generateHallTicket);
router.get('/get-hall-ticket/:studentId', authController.getStudentHallTicket);
router.post('/statusHallticket', authController.statusHallTicket);
module.exports = router;