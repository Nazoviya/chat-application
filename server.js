//server.js, getting arguments for port value of socket.io
const io = require('socket.io')(3000)

//declaration of object of users
const users = {}
//declaration of array of users that are going to be kicked
var kickUser = []

//io.on connection and getting name of the sender
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
    //push every value that match to kickUser array to be able to provide disconnection
    kickUser.push(name)
  })

  //broadcasting chat message to everyone in the chat
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    //declaration of kickUser() function to get value of the
    //people that will be kicked from the server
    for (i in kickUser) {
      if (message == "/kick " + kickUser[i]) {
        console.log(kickUser[i] + " kicked from server")
      }
    }
    //declaration of start of the game
    if (message == "#GAMESTART") {
      console.log("game started")
      console.log("_ e t w _ _ r k _ _ g ")
    }
    //declaration of end of the game
    if (message == "#GAMEEND") {
      console.log("game ended")
      console.log("answer is networking")
    }

  //broadcasting name of the disconnected person to the server which
  //visible to every person in the server at that time
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})