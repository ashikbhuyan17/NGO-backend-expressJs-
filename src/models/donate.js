const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var donateSchema = new mongoose.Schema({
    amount: {
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
module.exports = mongoose.model('Donate', donateSchema);