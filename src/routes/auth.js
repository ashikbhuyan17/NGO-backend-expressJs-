const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { signup, signIn } = require('../controller/auth')
const { check } = require('express-validator');
const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../validators/auth');
const { requireSignIn } = require('../common-middleware');
const { createEducation } = require('../controller/education');
const Education = require('../models/education');


router.post('/signin', validateSignInRequest, isRequestValidated, signIn)

router.post('/signup', validateSignupRequest, isRequestValidated, signup)

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



// router.put('/education/:id', (req, res) => {
//     const { id: _id } = req.params // Assigning id to _id which is a es6 feature. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
//     const position = req.body
//     console.log("🚀 ~ file: auth.js ~ line 59 ~ router.put ~ position", position)
//     const updateData = {
//         _id,
//         position
//     }
//     Education.findByIdAndUpdate(
//         _id,
//         updateData,
//         { upsert: true },
//         (err, updatedBoard) => {
//             if (err) {
//                 res.json({
//                     updateData,
//                     success: false,
//                     msg: 'Failed to update board'
//                 })
//             } else {
//                 console.log("🚀 ~ file: auth.js ~ line 77 ~ router.put ~ updateData", updateData)
//                 res.json({ updateData, success: true, msg: 'update successfully done' })
//             }
//         }
//     )
// })


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

// app.delete('/delete/:id', (req, res) => {
//     console.log(req.params.id);
//     productsCollection.deleteOne({
//       _id: ObjectId(req.params.id)
//       // status: "D"
//     })
//       .then((result) => {
//         console.log(result);
//         res.send(result.deletedCount > 0)
//       })
//   })
router.get('/profile', requireSignIn, async (req, res) => {
    // console.log(req.headers);
    // User.findAll()
    // res.status(200).json({
    //     user: 'profile'
    // })
    console.log("data", req.user)
    try {
        const user = await User.find({});
        res.json(user);
    } catch (error) {
        res.json(error);
    }
})


router.get('/', (req, res) => {
    res.send('this is auth page')
})


module.exports = router;