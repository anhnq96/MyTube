const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    video: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    size: {
        type: Number,
        default: 0
    },
    mimetype: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;