import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: String,
    context: String,
    creator: String,
    type: String,
    community: String,
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

var PostMessage = mongoose.model("PostMessage", postSchema)

export default PostMessage