const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');

// Route to start OAuth
router.get('/google', passport.authenticate('google',{scope : ['email','profile']}));

// Callback route after OAuth authentication
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    // Successful authentication
    res.redirect('/accounts'); 
});

router.post('/login', authController.login);

module.exports = router;
