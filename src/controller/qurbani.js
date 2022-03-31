const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Qurbani = require('../models/qurbani');

exports.createQurbani = (req, res) => {
    console.log("🚀 ~ file: education.js ~ line 7 ~ req", req)

    User.findOne()
        .exec((error, user) => {
            if (!user) {
                return res.status(400).json({ message: 'user not found !! please signup' });
            }
            const { meatName, meatQuantity, meatAmount, area } = req.body;
            const _food = new Qurbani({
                meatName,
                meatQuantity,
                meatAmount,
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


exports.deleteQurbani = (req, res) => {
    Qurbani.deleteOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            return res.status(200).json({ message: ' Delete successfully' })
        }
        else {
            console.log("error")
        }
    })
}

exports.getQurbani = (req, res) => {
    Qurbani.find({})
        .exec((err, data) => {
            // console.log("🚀 ~ file: auth.js ~ line 21 ~ .exec ~ res", res)
            if (!err) {
                return res.status(200).json({ message: data })
            } else {
                return res.status(500).json({ message: 'cloud not find data' })
            }

        })
}
