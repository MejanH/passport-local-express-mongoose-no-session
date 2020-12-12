const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

// passport strategy config
// first of all you gotta add the ".Strategy" in the end of passport reuire import.
passport.use(new LocalStrategy(
    function (username, password, done) {
        // bellow is mongoose Mode.findOne() query
        // the "done()" function is the one working with LocalStrategy
        // the "message: " option will send via info perameter on passport.use()
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err) }
            if (!user) {
                return done(null, false, { message: "Incorrect username." })
            }

            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password." })
            }

            return done(null, user)
        })
    }
))

// login with username & password
router.post("/login", (req, res, next) => {
    // "local" is the name of the strategy method
    // user is from the returned user from Localstrategy method
    passport.authenticate("local", (err, user, info) => {
        if (err) { throw err; }

        if (user) {
            res.send(user)
        } else {
            res.send(info) // info is message we set on LocalStrategy
        }

    })(req, res, next) //invoked function expression javascript
})

// get all users
router.get("/users", (req, res) => {
    console.log(req.body);
    User.find((err, users) => {
        if (err) {
            console.log(err);
        }
        res.json(users)
    })
})

// add new user
router.post("/users", (req, res) => {
    const newUser = new User(req.body)

    newUser.save().then((user) => {
        res.send(user)
    }).catch((error) => {
        console.log(error);
        res.status(500).send("User Creation Failed.")
    })
})

module.exports = router