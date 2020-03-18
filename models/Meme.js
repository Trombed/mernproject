const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: String,
        required: true
    // },
    // imageTitle: {
    //     type: String,
    //     required: true
    // },
    // category: {
    //     type: String,
    //     required: true
    // },
    date: {
        type: Date,
        default: Date.now
    }
});

const Meme = mongoose.model('Meme', MemeSchema);

module.exports = Meme;