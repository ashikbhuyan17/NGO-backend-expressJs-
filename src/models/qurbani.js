const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var qurbaniSchema = new mongoose.Schema({
    meatName: {
        type: String,
        required: true,
        trim: true,
    },
    meatQuantity: {
        type: String,
        required: true,
        trim: true,
    },
    meatAmount: {
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
module.exports = mongoose.model('Qurbani', qurbaniSchema);