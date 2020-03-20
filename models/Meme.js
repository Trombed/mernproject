const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    date: {
        type: Date,
        default: Date.now
    }
});

const Meme = mongoose.model('Meme', MemeSchema);

module.exports = Meme;