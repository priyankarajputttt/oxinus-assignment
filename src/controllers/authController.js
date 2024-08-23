const passport = require("passport");


const authController = {
    login: async (req, res) => {
        passport.authenticate('local', (err, account, info) => {
          if (err) {
            return res.status(500).json({ error: 'Server error: ' + err.message });
          }
          if (!account) {
            return res.status(400).json({ error: info.message });
          }
          req.login(account, (err) => {
            if (err) {
              return res.status(500).json({ error: 'Server error: ' + err.message });
            }
            res.json({ message: 'Login successful', account });
          });
        })(req, res);
      }
      
};

module.exports = authController;
