const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ensure this matches your User model's export name
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true, // Removes unnecessary spaces
    },
    email: {
        type: String,
        required: true,
        // unique: true, // Prevents duplicate profiles
        lowercase: true, // Ensures consistency in emails
    },
    phone: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Profile', ProfileSchema);