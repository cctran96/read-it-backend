import Community from "../models/Community.js"
import mongoose from "mongoose"

export const getCommunities = async (req, res) => {
    try {
        const communities = await Community.find({})
        res.status(200).json(communities)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createCommunity = async (req, res) => {
    const community = req.body

    try {
        const existingName = await Community.findOne({ name: community.name })
        console.log(existingName)
        if (existingName) return res.status(400).json({ message: "Community name already exist." })

        const newCommunity = await Community.create(community)
        // console.log(newCommunity)
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

export const updateCommunity = async (req, res) => {
    const { id } = req.params
    const body = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Community not found")

    const updatedCommunity = {...body, _id: id}

    await Community.findByIdAndUpdate(id, updatedCommunity, {new: true})

    res.json(updatedCommunity)
}

export const deleteCommunity = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Community not found")

    await Community.findByIdAndRemove(id)

    res.json({ message: "Community Successfully deleted." })
}

export const joinCommunity = async (req, res) => {
    const { id } = req.params

    if(!req.userId) return res.json({ message: "Unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Community not found")

    const community = await Community.findById(id)

    const index = Community.admin.findIndex(id => id === String(req.userId))

    if(index === -1) {
        community.admin.push(req.userId)
    } else {
        community.admin = community.admin.filter(id => id !== String(req.userId))
    }
}