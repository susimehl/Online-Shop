const express = require('express');
const router = express.Router();

/* GET home page */

router.get("/", (req, res, next) => {
    res.render("index")
  })
  
  router.get("/main", isLoggedIn, (req, res, next) => {
    const loggedInUser = req.session.user
    res.render("main", { user: loggedInUser })
  })
  
  router.get("/private", isLoggedIn, (req, res, next) => {
    const loggedInUser = req.session.user
    res.render("private", { user: loggedInUser })
  })
  

module.exports = router;
