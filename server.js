var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  //capture message from index.html to server
  socket.on('chat message', function(msg){
    // send message to all clients including sender
    // io.emit('chat message', msg);

    // sending to all clients except sender
    socket.broadcast.emit('chat message', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});