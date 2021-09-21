import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const messageSchema = mongoose.Schema({
    text: String,
    sender: {
        type: ObjectId,
        ref: "User"
    },
    chat: {
        type: ObjectId,
        ref: "Chat"
    }
}, {
    timestamps: true
})

var Message = mongoose.model("Message", messageSchema)

export default Message