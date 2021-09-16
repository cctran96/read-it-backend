import Chat from "../models/Chat.js"

export const getChats = async (req, res) => {
    const { id } = req.params
    
    try {
        const chats = await Chat.find({ users: id })
        res.status(200).json(chats)
    } catch(error) {
        res.status(404).json({ error: error.message })
    }
}

export const createChat = async (req, res) => {
    try {
        const chat = req.body
        const newChat = await Chat.create(chat)
        res.status(201).json(newChat)
    } catch(error) {
        res.status(409).json({ error: error.message })
    }
}

export const updateChat = async (req, res) => {
    const { id } = req.params
    const body = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Chat not found")

    const updatedChat = {...body, _id: id}

    await Chat.findByIdAndUpdate(id, updatedChat, { new: true })

    res.json(updatedChat)
}

export const leaveChat = async (req, res) => {
    const { id } = req.params
    const body = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Chat not found")

    try {
        if (body.users.length) {
            const updatedChat = {...body, _id: id}
    
            await Chat.findByIdAndUpdate(id, updatedChat, { new: true })
    
            res.json(updatedChat)
        } else {
            await Chat.findByIdAndRemove(id)

            res.json({ message: "Chat succesfully deleted." })
        }
    } catch(error) {
        res.status(404).json({ error: error.message })
    }
}