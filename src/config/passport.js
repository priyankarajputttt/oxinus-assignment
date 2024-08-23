const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const Account = require('../models/accountModel'); 
const authService = require('../services/authService');

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const account = await Account.findByEmail(email);
      if (!account) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      const isMatch = await authService.comparePassword(password, account.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      return done(null, account);
    } catch (err) {
      return done(err);
    }
  }
));


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      // Check if the user already exists in the database
      let account = await Account.findByEmail(profile.emails[0].value);
      
      if (account) {
        // If the account exists, return it
        console.log("account",account)
        return done(null, account);
      } else {
        // If the account doesn't exist, create a new one
        const newAccountData = {
          first_name: profile.displayName || '',
          last_name: '',
          email: profile.emails[0].value,
          phone: '', // Handle phone if available in the profile
          password: '', // OAuth doesn't use password; handle as needed
          birthday: '',
          oauthId : profile.id
        };
        account = await Account.create(newAccountData);
        console.log("account",account)
        return done(null, account);
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((account, done) => {
  done(null, account);
});

passport.deserializeUser(async (id, done) => {
  try {
    const account = await Account.findById(id.id);
    console.log("inside deserialze ", id, account)
    done(null, account);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
