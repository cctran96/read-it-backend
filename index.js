import dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import postRoutes from "./routes/posts.js"

dotenv.config()

const app = express()
const URL = process.env.URL
const PORT = process.env.PORT || 5000

app.use("/posts", postRoutes)

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(error => console.log(error.message))

mongoose.set("useFindAndModify", false)