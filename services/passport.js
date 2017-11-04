const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// const User = require('../models/User');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      //   let prof = JSON.stringify(profile, undefined, 2);
      //   console.log(`accessToken: ${accessToken}`);
      //   console.log(`refreshToken: ${refreshToken}`);
      //   console.log(`profile: ${prof}`);
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({ googleId: profile.id }).save().then(user => {
              done(null, user);
            });
          }
        })
        .catch(error => {
          return done(null, false, { message: 'Error' });
        });
    }
  )
);
