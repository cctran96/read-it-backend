import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const chatSchema = mongoose.Schema({
    title: String,
    users: [{
        type: ObjectId,
        ref: "User"
    }],
    lastMessage: {
        type: ObjectId,
        ref: "Message"
    }
}, {
    timestamps: true
})

var Chat = mongoose.Schema("Chat", chatSchema)

export default Chat