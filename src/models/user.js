const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    // name: {
    //     firstName: {
    //         type: 'string',
    //         required: true,
    //         trim: true,
    //         min: 3,
    //         max: 20,
    //     },
    //     lastName: {
    //         type: 'string',
    //         required: true,
    //         trim: true,
    //         min: 3,
    //         max: 20,
    //     },
    // },
    firstName: {
        type: 'string',
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: 'string',
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    username: {
        type: 'string',
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: 'string',
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: 'string',
        required: true,

    },
    role: {
        type: 'string',
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {
        type: 'string',
    },
    profilePicture: {
        type: 'string',
    }
}, { timestamps: true })


userSchema
    .virtual('fullName')
    .get(function () {
        // return this.firstName + ' ' + this.lastName;
        return `${this.firstName} ${this.lastName}`;
    });

userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10)
    })

userSchema.methods = {
    authenticate: function (password) {
        // console.log(this.hash_password);
        // console.log(password);
        // if (this.hash_password == password) {
        //     console.log("correct")
        // } else {
        //     console.log("incorrect")

        // }
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema)