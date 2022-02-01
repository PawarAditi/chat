const express = require('express')
const http = require('http')
const port = process.env.PORT || 3012
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const path = require('path')

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/html.html')
})

var name = "";

io.on('connection', (socket) => {

    console.log("new user arrived")

    socket.on('joining msg', (username) =>
    {
        name = username
        io.emit('chat message', "New person have joined : " + name)
    })

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg)
    })

})

server.listen(port, () => {
    console.log("server started at ", port)
})