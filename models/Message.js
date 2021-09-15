import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const messageSchema = mongoose.Schema({
    body: String,
    sender: {
        type: ObjectId,
        ref: "User"
    },
    chat: {
        type: ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

var Message = mongoose.model("Message", messageSchema)

export default Message