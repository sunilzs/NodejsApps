var express = require('express')
var app = express()
var PORT = 3000
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))


io.on('connection', function (socket) {
    console.log('User connected via socket.io')

    socket.on('message', function(message){
        console.log('message received is :'+ message.text)
        socket.broadcast.emit('message', message)
    }) 

    socket.emit('message', {
        text: 'Welcome to chat application'
    })

})


http.listen(PORT, function () {
    console.log('server started')
})