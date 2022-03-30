const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Education = require('../models/education');

exports.createEducation = (req, res) => {
    console.log("🚀 ~ file: education.js ~ line 7 ~ req", req)

    User.findOne()
        .exec((error, user) => {
            if (!user) {
                return res.status(400).json({ message: 'user not found !! please signup' });
            }
            const { bookName, bookQuantity, bookAmount, area } = req.body;
            const _education = new Education({
                bookName,
                bookQuantity,
                bookAmount,
                area,
            })
            _education.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: "something went wrong" })
                }
                if (data) {
                    return res.status(201).json({ user: data })
                }
            })
        })
}

