const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { signup, signIn } = require('../controller/auth')
const { check } = require('express-validator');
const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../validators/auth');
const { requireSignIn } = require('../common-middleware');
const { createEducation } = require('../controller/education');
const Education = require('../models/education');
const { createFood, deleteFood, getFood } = require('../controller/food');
const { createBlood, deleteBlood, getBlood } = require('../controller/blood');
const { createQurbani, deleteQurbani, getQurbani } = require('../controller/qurbani');
const { createReview, deleteReview, getReview } = require('../controller/review');



router.post('/signin', validateSignInRequest, isRequestValidated, signIn)

router.post('/signup', validateSignupRequest, isRequestValidated, signup)



// education
router.post('/education', createEducation)

router.get('/education', (req, res) => {
    Education.find({})
        .exec((err, data) => {
            // console.log("🚀 ~ file: auth.js ~ line 21 ~ .exec ~ res", res)
            if (!err) {
                return res.status(200).json({ message: data })
            } else {
                return res.status(500).json({ message: 'cloud not find data' })
            }

        })
})
router.get('/education/:id', (req, res) => {
    Education.findOne({ _id: req.params.id })
        .exec((err, data) => {
            // console.log("🚀 ~ file: auth.js ~ line 21 ~ .exec ~ res", res)
            if (!err) {
                return res.status(200).json({ message: data })
            } else {
                return res.status(500).json({ message: 'cloud not find data' })
            }

        })
})

router.put('/education/:id', (req, res) => {
    const { id: _id } = req.params // Assigning id to _id which is a es6 feature. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const position = req.body
    console.log("🚀 ~ file: auth.js ~ line 59 ~ router.put ~ position", position)
    const updateData = {
        _id,
        position
    }
    Education.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            bookName: req.body.bookName,
            bookQuantity: req.body.bookQuantity,
            bookAmount: req.body.bookAmount,
            area: req.body.area
        }
    }, {
        new: true,
        useFindAndModify: false,
    }).exec((err, data) => {
        if (!err) {
            return res.status(200).json({ message: data })
        } else {
            return res.status(500).json({ message: 'cloud not find data' })
        }

    })
})

router.delete('/education/:id', (req, res) => {
    console.log("🚀 ~ file: auth.js ~ line 18 ~ router.delete ~ req", req.params.id)
    Education.deleteOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            return res.status(200).json({ message: ' Delete successfully' })
        }
        else {
            console.log("error")
        }
    })
})

router.get('/profile', requireSignIn, async (req, res) => {
    console.log("data", req.user)
    try {
        const user = await User.find({});
        res.json(user);
    } catch (error) {
        res.json(error);
    }
})

// Food
router.post('/food', createFood)
router.get('/food', getFood)
router.delete('/food/:id', deleteFood)

//Blood Donation
router.post('/blood', createBlood)
router.get('/blood', getFood)
router.delete('/blood/:id', deleteFood)


//Qurbani
router.post('/qurbani', createQurbani)
router.get('/qurbani', getQurbani)
router.delete('/qurbani/:id', deleteQurbani)


// review
//Qurbani
router.post('/review', createReview)
router.get('/review', getReview)
router.delete('/review/:id', deleteReview)

router.get('/', (req, res) => {
    res.send('this is auth page')
})


module.exports = router;