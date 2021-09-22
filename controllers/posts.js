import Post from "../models/Post.js"
import mongoose from "mongoose"

export const getPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new Post(post)
    let errors = {}

    if (!post.community) errors.community = "Community must exist."

    if (!post.title) errors.title = "Post requires a title to submit."

    if (!post.context) errors.context = "Context must exist."

    if(Object.keys(errors).length) return res.status(400).json({ errors })

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch(error) {
        res.status(409).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params

    try {
        const post = await Post.findById(id)

        res.status(200).json(post)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    const body = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Post not found")

    const updatedPost = {...body, _id: id}

    await Post.findByIdAndUpdate(id, updatedPost, { new: true })

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Post not found")

    await Post.findByIdAndRemove(id)

    res.json({ message: "Post succesfully deleted." })
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if (!req.userId) return res.json({ message: "Unauthenticated"})

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Post not found")

    const post = await Post.findById(id)

    const index = post.likes.findIndex(id => id === String(req.userId))

    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }

    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true })

    res.json(updatedPost)
}

export const getUserPosts = async (req, res) => {
    const { username } = req.params
    
    try {
        const posts = await Post.find({ creator: username })
        res.status(200).json(posts)
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}