import Community from "../models/Community.js"

export const getCommunities = async (req, res) => {
    try {
        const communities = await Community.find()
        res.status(200).json(communities)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createCommunity = async (req, res) => {
    const community = req.body
    const newCommunity = new Community(community)
    try {

        const existingName = await Community.findOne({ name })
        if (existingName) res.status(400).json({ message: "Community name already exist." })

        await newCommunity.save()
        res.status(201).json(newCommunity)

    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCommunity = async (req, res) => {
    const { id } = req.params;

    try {
        const community = await Community.findById(id)

        res.status(200).json(community)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}