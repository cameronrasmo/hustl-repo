const express = require("express");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.route("/signup").post((req, res, next) => {
    User.findOne({ username: req.body.username }, (err, found) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        if (found) {
            res.status(500);
            return next(new Error("Username already exists, try another."));
        }
        const newUser = new User(req.body);
        newUser.save((err, saved) => {
            if (err) {
                res.status(500);
                return next(new Error("All fields required."));
            }
            const token = jwt.sign(
                newUser.withoutPassword(),
                process.env.SECRET
            );
            res.status(201).send({ token, user: newUser.withoutPassword() });
        });
    });
});

authRouter.route("/login").post((req, res, next) => {
    User.findOne({ username: req.body.username }, (err, found) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        if (!found) {
            res.status(403);
            return next(new Error("Username or Password incorrect."));
        }
        found.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403);
                return next(new Error("Username or Password incorrect."));
            }
            if (!isMatch) {
                res.status(403);
                return next(new Error("Username or Password incorrect."));
            }
            const token = jwt.sign(found.withoutPassword(), process.env.SECRET);
            res.status(200).send({ token, user: found.withoutPassword() });
        });
    });
});

module.exports = authRouter;
