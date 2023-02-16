const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const Cart = require("../models/Cart.model")

router.get("/auth/signup", (req, res) => {
  res.render("signup");
});

router.post("/auth/signup", (req, res, next) => {
  const { username, password, email } = req.body;

  if (username === "") {
    res.render("signup", { message: "Username cannot be empty" });
    return;
  }

  User.findOne({ username }).then((userFromDB) => {
    if (userFromDB) {
      res.render("signup", { message: "Username is already taken" });
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ username: username, password: hash, email:email})
        .then((createdUser) => {
          Cart.create({userId: createdUser._id})
          .then(()=>{
            res.redirect("/auth/login");
          })
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

router.get("/auth/login", (req, res, next) => {
  res.render("login");
});

router.post("/auth/login", (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username }).then((userFromDB) => {
    if (userFromDB === null) {
     
      res.render("login", { message: "Wrong credentials" });
      return;
    }

    
    if (bcrypt.compareSync(password, userFromDB.password)) {
      
      req.session.user = userFromDB;
      res.redirect("/");
    } else {
      res.render("login", { message: "Wrong credentials" });
      return;
    }
  });
});

router.get("/auth/logout", (req, res, next) => {
 
    req.session.destroy()
    res.redirect("/")
})

module.exports = router

