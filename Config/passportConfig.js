const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/users");

function passportConfig(passport) {
  // console.log('passport is in use')
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        // match user
        User.findOne(
          {
            email,
          },
          async (err, user) => {
            if (err) throw err;
            if (!user) {
              // console.log('no user founded ');
              return done(null, false, {
                message: "this email is not registered",
              });
            } else {
              // console.log(' user founded and chacking password ', password, email);

              // match password
              const isMatch = await bcrypt.compare(password, user.password);
              // console.log(isMatch)
              if (isMatch) {
                // console.log('every thing ok')
                return done(null, user);
              } else {
                // console.log('some thing is not ok')
                return done(null, false, {
                  message: "password is incorrect",
                });
              }
            }
          }
        );
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
module.exports = passportConfig;
