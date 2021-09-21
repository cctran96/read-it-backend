import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const postSchema = mongoose.Schema({
    title: String,
    context: String,
    creator: {
        type: ObjectId,
        ref: "User"
    },
    type: String,
    community: {
        type: ObjectId,
        ref: 'Community'
    },
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