import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const communitySchema = mongoose.Schema({
    name: String, 
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    image: String,
    admin: [{
        type: ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: ObjectId,
        ref: 'Post'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

var postCommunity = mongoose.model("Community", communitySchema)

export default postCommunity;