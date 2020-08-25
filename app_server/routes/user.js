var express = require('express');
var router = express.Router();
var config = require('config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var auth = require('../../middleware/auth');
var Waiter = require('../models/waiter');
var Staff = require('../models/staff');

const JWT_SECRET = config.get('jwtSecret');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////      WAITER USERPROFILE      ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   POST routes/user/loginwaiter
 * @desc    Login user
 * @access  Public
 */

router.post('/loginwaiter', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await Waiter.findOne({ email });
    if (!user) throw Error('Waiter Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
        token,
        user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST routes/user/registerwaiter
 * @desc    Register new user
 * @access  Public
 */

router.post('/registerwaiter', async (req, res) => {
  const { name, username, email, phonenumber, password } = req.body;

  // Simple validation
  if (!name || !username || !email || !phonenumber || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user= await Waiter.findOne({ email });
    if (user) throw Error('Waiter already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newWaiter = new Waiter({
      name,
      username,
      email,
      phonenumber,
      password: hash
    });

    const savedWaiter = await newWaiter.save();
    if (!savedWaiter) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedWaiter._id }, JWT_SECRET, {
        expiresIn: 3600
      });  

    res.status(200).json({
        token,
        user: {
        id: savedWaiter.id,
        name: savedWaiter.name,
        username : savedWaiter.username,
        email: savedWaiter.email,
        phonenumber: savedWaiter.phonenumber
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}); 

/**
 * @route   GET user/waiter
 * @desc    Get user data
 * @access  Private
 */

router.get('/waiter',auth, async (req, res) => {
    try{
        Waiter.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////      STAFF USERPROFILE       ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/**
 * @route   POST routes/user/loginstaff
 * @desc    Login user
 * @access  Public
 */

router.post('/loginstaff', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await Staff.findOne({ email });
    if (!user) throw Error('Staff Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
        token,
        user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST routes/user/registerstaff
 * @desc    Register new user
 * @access  Public
 */

router.post('/registerstaff', async (req, res) => {
  const { name, username, email, phonenumber, password } = req.body;

  // Simple validation
  if (!name || !username || !email || !phonenumber || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user= await Staff.findOne({ email });
    if (user) throw Error('Staff already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newStaff = new Staff({
      name,
      username,
      email,
      phonenumber,
      password: hash
    });

    const savedStaff = await newStaff.save();
    if (!savedStaff) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedStaff._id }, JWT_SECRET, {
        expiresIn: 3600
      });  

    res.status(200).json({
        token,
        user: {
        id: savedStaff.id,
        name: savedStaff.name,
        username : savedStaff.username,
        email: savedStaff.email,
        phonenumber: savedStaff.phonenumber
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}); 

/**
 * @route   GET user/staff
 * @desc    Get user data
 * @access  Private
 */

router.get('/staff',auth, async (req, res) => {
    try{
        Staff.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
  });

  module.exports = router;