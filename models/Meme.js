const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    // text field might be changed soon
    category: {
        type: String,
        required: true
    },
    // added category to "tag"
    date: {
        type: Date,
        default: Date.now
    }
});

const Meme = mongoose.model('Meme', MemeSchema);

module.exports = Meme;