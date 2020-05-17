import express from "express";
import passport from "passport";
import { success, failure } from "../helper/response";
const router = express.Router();

router.post("/signup", (req, res, next) => {
    passport.authenticate(
        "local-signup",
        { session: false },
        (err, user, info) => {
            console.log(err, user, info);
            if (!user)
                return res.send(failure(info ? info.message : "Server error"));
            return res.send(success(user));
        }
    )(req, res, next);
});

router.post("/signin", (req, res, next) => {
    passport.authenticate(
        "local-signin",
        { session: false },
        (err, user, info) => {
            console.log(err, user, info);
            if (err || !user)
                return res.send(failure(info ? info.message : "Server error"));
            return res.send(success(user));
        }
    )(req, res, next);
});

export default router;
