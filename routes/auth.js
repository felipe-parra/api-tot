const router = require("express").Router();
const ensureLogin = require("connect-ensure-login");
const passport = require("../config/passport");
const User = require("../models/User");
const Store = require("../models/Store");

router.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.post("/register", (req, res) => {
  User.register({ ...req.body }, req.body.password)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(400).json("Error: " + error);
    });
});

router.get("/register", (req, res) => {
  const stores = Store.find();
  res.render("register", { stores });
});

router.get("/login", (req, res) => {
  res.render("form");
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ loggedUser: req.user });
});
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/api/user/login",
//     successRedirect: "/api/user/profile"
//   })
// );

router.get(
  "/profile",
  ensureLogin.ensureLoggedIn({ failureRedirect: "/api/user/login" }),
  (req, res) => {
    res.render("profile", { loggedUser: req.user });
  }
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/api/user/login");
});

router.patch("/edit/:id", (req, res) => {
  const { id } = req.params;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});
module.exports = router;
