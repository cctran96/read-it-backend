import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    username: { type: String, required: true, minlength: 6, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String
})

var User = mongoose.model("User", userSchema)

export default User