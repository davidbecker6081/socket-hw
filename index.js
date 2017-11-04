var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('loggedIn', 'User has logged in.');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('loggedOut', 'User disconnected')
  })

  socket.on('typing', (message) => {
    socket.broadcast.emit('notify-typing', message)
  })
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
