const { default: mongoose} = require('mongoose');

var universitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
}, {timestamps: true})

const University = mongoose.model("University", universitySchema);
module.exports = University