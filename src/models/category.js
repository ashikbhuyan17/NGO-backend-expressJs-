const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: { type: String, index: { unique: true, dropDups: true } },
    parentId: {
        type: String,
    },
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Category', categorySchema);

