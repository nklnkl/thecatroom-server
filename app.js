var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// upon connect.
io.on('connection', function(socket){
  console.log('a user connected');

  // upon disconnect.
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // upon message.
  socket.on('message', function(msg){
    console.log(msg);
    socket.broadcast.emit(msg);
  });
});

http.listen(10005, function(){
  console.log('listening on *:10005');
});
