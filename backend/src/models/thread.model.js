const { default: mongoose } = 'mongoose';

const threadSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true, 
        unique: true,
    }, 
    user_id: {
        type: String,
        required: true,
    },
    fraudit_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }, 
    
}, {timestamps: true})

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;