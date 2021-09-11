import mongoose from "mongoose"

const communitySchema = mongoose.Schema({
    name: { type: String, unique: true},
    creator: String,
    admin: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

var postCommunity = mongoose.model("Community", communitySchema)

export default postCommunity;