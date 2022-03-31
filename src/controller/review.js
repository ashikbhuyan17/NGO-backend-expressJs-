const User = require('../models/user');
const Review = require('../models/review');

exports.createReview = (req, res) => {
    console.log("🚀 ~ file: education.js ~ line 7 ~ req", req)

    User.findOne()
        .exec((error, user) => {
            if (!user) {
                return res.status(400).json({ message: 'user not found !! please signup' });
            }
            const { reviewName, organizationName, feedback, rating } = req.body;
            const _food = new Review({
                reviewName,
                organizationName,
                feedback,
                rating,
            })
            _food.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "something went wrong" })
                }
                if (data) {
                    return res.status(201).json({ message: data })
                }
            })
        })
}


exports.deleteReview = (req, res) => {
    Review.deleteOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            return res.status(200).json({ message: ' Delete successfully' })
        }
        else {
            console.log("error")
        }
    })
}

exports.getReview = (req, res) => {
    Review.find({})
        .exec((err, data) => {
            // console.log("🚀 ~ file: auth.js ~ line 21 ~ .exec ~ res", res)
            if (!err) {
                return res.status(200).json({ message: data })
            } else {
                return res.status(500).json({ message: 'cloud not find data' })
            }

        })
}
