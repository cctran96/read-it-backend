import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "User doesn't exist." })
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) return res.status(400).json({ message: "Invalid credentials" })

        const secret = process.env.SECRET_KEY
        const token = jwt.sign({ 
            email: user.email, 
            id: user._id, 
            username: user.username, 
            bio: user.bio 
        }, secret, { expiresIn: "1h" })
        console.log(secret)

        res.status(200).json({ result: user, token })
    } catch(error) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}

export const signup = async (req, res) => {
    const { email, username, password, confirm } = req.body

    try {
        const existingUser = await User.findOne({ username })
        const existingEmail = await User.findOne({ email })
        let errors = {}
        if (existingUser) errors.username = "Username already taken."
        if (existingEmail) errors.email = "Email already exists."
        if (password !== confirm) errors.password = "Password does not match."
        if (errors === {}) return res.status(400).json({ errors })

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPassword, username: username, bio: "" })

        const secret = process.env.SECRET_KEY
        const token = jwt.sign({ 
            email: result.email, 
            id: result._id, 
            username: result.username,
            bio: result.bio
        }, secret, { expiresIn: "1h" })
        res.status(200).json({ result, token })
    } catch(error) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}
