import Message from "../models/Message.js"
import Chat from "../models/Chat.js"

export const getMessages = async (req,res) => {
    try {
        const { id } = req.params
        
        const messages = await Message.find({ chat: id })

        res.status(200).json(messages)
    } catch(error) {
        res.status(404).json({ error: error.message })
    }
}

export const createMessage = async (req, res) => {
    try {
        const message = req.body

        const newMsg = await Message.create(message)

        const chat = await Chat.findByIdAndUpdate(newMsg.chat, { lastMessage: newMsg }, { new: true })

        res.status(201).json({ message: newMsg, chat })
    } catch(error) {
        res.status(409).json({ error: error.message })
    }
}

export const deleteMessage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Chat not found")

    await Chat.findByIdAndRemove(id)

    res.json({ message: "Message succesfully deleted." })
}