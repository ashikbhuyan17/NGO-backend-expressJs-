const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Donate = require('../models/donate');

exports.createDonate = (req, res) => {
    console.log("🚀 ~ file: education.js ~ line 7 ~ req", req)

    User.findOne()
        .exec((error, user) => {
            if (!user) {
                return res.status(400).json({ message: 'user not found !! please signup' });
            }
            const { amount, area } = req.body;
            const _donate = new Donate({
                amount,
                area,
            })
            _donate.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "something went wrong" })
                }
                if (data) {
                    return res.status(201).json({ user: data })
                }
            })
        })
}



exports.deleteDonate = (req, res) => {
    Donate.deleteOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            return res.status(200).json({ message: ' Delete successfully' })
        }
        else {
            console.log("error")
        }
    })
}

exports.getDonate = (req, res) => {
    Donate.find({})
        .exec((err, data) => {
            // console.log("🚀 ~ file: auth.js ~ line 21 ~ .exec ~ res", res)
            if (!err) {
                return res.status(200).json({ message: data })
            } else {
                return res.status(500).json({ message: 'cloud not find data' })
            }

        })
}

