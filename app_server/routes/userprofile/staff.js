var express = require('express');
var router = express.Router();
const staffController = require('../../controllers/userprofile/staffController');

/**
 * @route   POST routes/user/loginstaff
 * @desc    Login user
 * @access  Public
 */

router.post('/loginstaff', staffController.staffLogin);

/**
 * @route   POST routes/user/registerstaff
 * @desc    Register new user
 * @access  Public
 */

router.post('/registerstaff', staffController.staffRegister);

/**
 * @route   GET user/staff
 * @desc    Get user data
 * @access  Private
 */

router.get('/staff', staffController.staffProfile);

module.exports = router;