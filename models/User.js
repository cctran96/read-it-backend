import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: String,
})

var User = mongoose.model("User", userSchema)

export default User