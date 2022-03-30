
const jwt = require('jsonwebtoken');

exports.requireSignIn = (req, res, next) => {
    // console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(400).json({ message: "Authenticate Required header" });
    } else {

        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET)
            // console.log("user", req.user);
            // console.log(
            //     user
            // );
            req.user = user;
        } else {
            return res.status(400).json({ message: "Authenticate Required" });

        }
        // const token = req.headers.authorization.split(" ")[1];
        // const user = jwt.verify(token, process.env.JWT_SECRET)
        // // console.log("user", req.user);
        // // console.log(user);
        // req.user = user;
        // // console.log(req.user);



    }
    next()
}

exports.userMiddleware = (req, res, next) => {
    console.log("user", req.user);
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: "User access denied" });
    }
    next()
}



exports.adminMiddleware = (req, res, next) => {
    // console.log("user", req.user);
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: "Admin access denied" });
    }
    next()
}


