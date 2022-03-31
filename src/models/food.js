const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
        trim: true,
    },
    foodQuantity: {
        type: String,
        required: true,
        trim: true,
    },
    donationAmount: {
        type: String,
        required: true,
        trim: true,
    },
    area: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Food', foodSchema);