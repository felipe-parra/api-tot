const passport = require("passport");
const User = require("../models/User");

passport.use(User.createStrategy());

// Use static serialize and deserialize of model of passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
