const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, `Please add a name.`]
    },
    email: {
        type: String, 
        required: [true, `Please add a email.`],
        unique: true;
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("Goal", userSchema);

module.exports = User;