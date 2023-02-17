import Mongoose from "mongoose"

const SongSchema = new Mongoose.Schema({
    channelName: {
        type: String,
        required: true
    },
    channelAvatar: {
        type: String,
        required: true
    },
    songTitle: {
        type: String,
        required: true
    },
    songThumbnail: {
        type: String,
        required: true
    },
    publishData: {
        type: Date,
        required: true
    },
    songId: {
        type: String,
        required: true
    },
    songDuration: {
        type: Number,
        required: true
    },
    



});

const Song = Mongoose.model("Song", SongSchema);

export default Song;