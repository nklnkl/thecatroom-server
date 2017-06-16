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
  socket.on('connected', function(msg){
    console.log(new Date().toTimeString() + ' ' + msg);
    io.emit(new Date().toTimeString() + ' ' + msg);
  });

  // upon message.
  socket.on('message', function(msg){
    console.log(new Date().toTimeString() + ' ' + msg);
    socket.emit('message', new Date().toTimeString() + ' ' + msg);
  });
});

http.listen(10005, function(){
  console.log('listening on *:10005');
});
