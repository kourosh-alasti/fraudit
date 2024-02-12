const { default: mongoose} = require('mongoose')

var professorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    overallRating: {
        type: Number,
        required: true, 
        default: 5,
    }
}, {timestamps: true})

const Professor = mongoose.model("Professor", professorSchema);
module.exports = Professor

