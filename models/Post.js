import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const postSchema = mongoose.Schema({
    title: String,
    context: String,
    creator: String,
    type: String,
    community: String,
    selectedFile: String,
    likes: {
        type: [ObjectId],
        default: []
    },
    comments: {
        type: [ObjectId],
        ref: "Comment"
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

var Post = mongoose.model("Post", postSchema)

export default Post