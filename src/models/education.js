const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var educationSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true,
    },
    bookQuantity: {
        type: String,
        required: true,
        trim: true,
    },
    bookAmount: {
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
module.exports = mongoose.model('Education', educationSchema);

