import Message from "../models/Message.js"

export const createMessage = async (req, res) => {
    try {
        const message = req.body
        const newMsg = Message.create(message)
        res.status(201).json(newMsg)
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