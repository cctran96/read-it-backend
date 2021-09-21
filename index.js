import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import chatRoutes from "./routes/chats.js"
import messageRoutes from "./routes/messages.js"
import communityRoutes from "./routes/communities.js"

dotenv.config()

const app = express()
const URL = process.env.URL
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/posts", postRoutes)
app.use("/users", userRoutes)
app.use("/chats", chatRoutes)
app.use("/messages", messageRoutes)
app.use("/communities", communityRoutes)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.")
})

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(error => console.log(error.message))

mongoose.set("useFindAndModify", false)