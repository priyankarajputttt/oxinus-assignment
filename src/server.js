const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const accountRoutes = require('./routes/accountRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const app = express();


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/accounts', accountRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
