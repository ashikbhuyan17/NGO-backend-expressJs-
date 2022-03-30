const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({ message: 'Admin already registered' });
            }
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
                role: 'admin'
            })
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "something went wrong" })
                }
                if (data) {
                    return res.status(201).json({ message: 'admin created successfully' })
                }
            })
        })
}

exports.signIn = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ message: "user not  found" });
            }
            if (user) {
                console.log(user);
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    const token = jwt.sign({ email: user.email, role: user.role, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
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
//     console.log(req.headers);
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//     const user = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = user;
//     next()
// }



// module.exports = { signIn, requireSignIn, signup }