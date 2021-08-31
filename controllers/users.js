import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config()
const secret = process.env.SECRET_KEY

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const error = {error: "The username or password is incorrect."}

        const user = await User.findOne({ email }) || await User.findOne({ username: email})
        if (!user) return res.status(404).json({ error })
        
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) return res.status(400).json({ error })

        let result = JSON.parse(JSON.stringify(user))
        delete result.password

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: "8h" })

        res.status(200).json({ result, token })
    } catch(error) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}

export const signup = async (req, res) => {
    const { email, username, password, confirm } = req.body
    try {
        let errors = {}

        const existingUser = await User.findOne({ username })
        if (existingUser) errors.username = "Username already taken."

        const existingEmail = await User.findOne({ email })
        if (existingEmail) errors.email = "Email already exists."

        if (password !== confirm) errors.password = "Password does not match."
        if (Object.keys(errors).length) return res.status(400).json({ errors })

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({ email, password: hashedPassword, username, bio: "" })
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: "8h" })

        let result = JSON.parse(JSON.stringify(user))
        delete result.password

        res.status(200).json({ result, token })
    } catch(error) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}
