import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const communitySchema = mongoose.Schema({
    name: String, 
    image: String,
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

var postCommunity = mongoose.model("Community", communitySchema)

export default postCommunity;