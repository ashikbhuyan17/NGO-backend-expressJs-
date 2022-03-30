const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signup = (req, res) => {
    // const errors = validationResult(req)
    // return res.status(400).json({ errors: errors.array() })
    // console.log(req.body);
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({ message: 'user already exists' });
            }
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
            })
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "something went wrong" })
                }
                if (data) {
                    return res.status(201).json({ user: data })
                }
            })
        })
}

exports.signIn = (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ message: "user not  found" });
            }
            if (user) {
                // console.log(user);

                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    const { firstName, lastName, email, role, fullName } = user
                    return res.status(200).json({
                        token,
                        user: {
                            firstName, lastName, email, role, fullName
                        }
                    });

                } else {
                    return res.status(400).json({ message: "password does not match" });
                }

            } else {
                return res.status(400).json({ message: "something went wrong" });
            }

        })
}


// exports.requireSignIn = (req, res, next) => {
//     // console.log(req.headers.authorization);
//     const token = req.headers.authorization.split(" ")[1];
//     // console.log(token);
//     const user = jwt.verify(token, process.env.JWT_SECRET)
//     // console.log("user", req.user);
//     // console.log(
//     //     user
//     // );
//     req.user = user;
//     next()
// }