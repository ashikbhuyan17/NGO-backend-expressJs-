const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var bloodSchema = new mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true,
        trim: true,
    },
    bloodQuantity: {
        type: String,
        required: true,
        trim: true,
    },
    bloodAmount: {
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
module.exports = mongoose.model('Blood', bloodSchema);