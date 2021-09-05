import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    name: String,
    admin: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

var postCommunity = mongoose.model("Community", postSchema)

export default postCommunity;