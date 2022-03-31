const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Food = require('../models/food');

exports.createFood = (req, res) => {
    console.log("🚀 ~ file: education.js ~ line 7 ~ req", req)

    User.findOne()
        .exec((error, user) => {
            if (!user) {
                return res.status(400).json({ message: 'user not found !! please signup' });
            }
            const { foodName, foodQuantity, donationAmount, area } = req.body;
            const _food = new Food({
                foodName,
                foodQuantity,
                donationAmount,
                area,
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


exports.deleteFood = (req, res) => {
    Food.deleteOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            return res.status(200).json({ message: ' Delete successfully' })
        }
        else {
            console.log("error")
        }
    })
}

exports.getFood = (req,res)=>{
    Food.find({})
        .exec((err, data) => {
            // console.log("🚀 ~ file: auth.js ~ line 21 ~ .exec ~ res", res)
            if (!err) {
                return res.status(200).json({ message: data })
            } else {
                return res.status(500).json({ message: 'cloud not find data' })
            }

        })
}
