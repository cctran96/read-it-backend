import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const chatSchema = mongoose.Schema({
    title: String,
    users: [{
        type: ObjectId,
        ref: "User"
    }],
    lastMessage: mongoose.SchemaTypes.Mixed
}, {
    timestamps: true
})

var Chat = mongoose.model("Chat", chatSchema)

export default Chat