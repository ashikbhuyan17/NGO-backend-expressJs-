const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var reviewSchema = new mongoose.Schema({
    reviewName: {
        type: String,
        required: true,
        trim: true,
    },
    organizationName: {
        type: String,
        required: true,
        trim: true,
    },
    feedback: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Review', reviewSchema);