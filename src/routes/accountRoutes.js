const express = require('express');
const passport = require('../config/passport');
const accountController = require('../controllers/accountController');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

router.post('/create', accountController.createAccount);
router.get('/:id', accountController.getAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);
router.get('/',ensureAuthenticated, accountController.listAccounts);

module.exports = router;
