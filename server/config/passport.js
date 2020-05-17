import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import bcrypt from "bcrypt";
require("dotenv").config();

const localOptions = {
    usernameField: "phoneNumber",
    passwordField: "password",
    passReqToCallback: true,
};

passport.use(
    "local-signup",
    new LocalStrategy(localOptions, (req, phoneNumber, password, next) => {
        User.findOne({ phoneNumber: phoneNumber }).then((doc) => {
            if (doc) return next(null, false, { message: "User exists!" });
            const passwordHash = bcrypt.hashSync(password, 18);
            const data = {
                phoneNumber,
                password: passwordHash,
                email: req.body.email || null,
            };
            User.create(data, (err, doc) => {
                if (err) return next(err, false, { message: "Database error" });
                const data = {
                    _id: doc._id,
                    phoneNumber: doc.phoneNumber,
                    email: doc.email,
                };
                const token = jwt.sign(data, process.env.JWT_SECRET);
                return next(null, token);
            });
        });
    })
);

passport.use(
    "local-signin",
    new LocalStrategy(localOptions, (req, phoneNumber, password, next) => {
        User.findOne({ phoneNumber }, (err, doc) => {
            if (err) return next(err);
            if (!doc)
                return next(null, false, { message: "Incorrect Phone number" });
            if (!bcrypt.compareSync(password, doc.password))
                return next(null, false, { message: "Incorrect Password" });
            const data = {
                _id: doc._id,
                phoneNumber: doc.phoneNumber,
                email: doc.email,
            };
            const token = jwt.sign(data, process.env.JWT_SECRET);
            return next(null, token);
        });
    })
);

passport.use(
    "jwt",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        (token, next) => {}
    )
);

export default passport;
