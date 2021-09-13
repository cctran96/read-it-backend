import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema({
    username: { type: String, required: true, minlength: 6, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    posts: [{
        type: ObjectId,
        ref: "Post"
    }]
})

var User = mongoose.model("User", userSchema)

export default User