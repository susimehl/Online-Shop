const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")


router.get("/auth/signup", (req, res) => {
    res.render("signup")
})

router.post("/auth/signup", (req, res) => {
    const { username, password } = req.body


    if (username === "") {
        res.render("signup", { message: "Username cannot be empty" })
        return
    }


    User.findOne({ username })
        .then(userFromDB => {
            if (userFromDB) {
                res.render("signup", { message: "Username is already taken" })

            } else {

                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)

                User.create({ username: username, password: hash })
                    .then(createdUser => {
                        console.log(createdUser)
                        res.redirect("/auth/login")
                    })
                    .catch(err => {next(err)})
            }

        })


})


module.exports = router;

