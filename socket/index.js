const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

// Adds user with socket id to array
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
        users.push({ userId, socketId})
}

// Get user from array
const getUser = id => users.find(user => user.userId === id)

// Removes user from array
const removeUser = (id) => {
    users = users.filter(user => user.socketId !== id)
}

io.on("connection", socket => {
    console.log("a user has connected")

    // User connects
    socket.on("addUser", id => {
        addUser(id, socket.id)
        io.emit("getUsers", users)
    })

    // Send and get message
    socket.on("sendMessage", ({ receiverId, message, chat }) => {
        console.log(users, receiverId)
        const user = getUser(receiverId)
        console.log(user)
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                message,
                chat
            })
        }
    })

    // User disconnects
    socket.on("disconnect", () => {
        console.log("a user has disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})