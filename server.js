// Author : Dicksen Veloopillay

var app = require('express')();
var express= require('express'); 
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/table', function(req, res){
  res.sendFile(__dirname + '/table.html');
});

app.get('/cards', function(req, res){
  res.sendFile(__dirname + '/cards.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // Table client connected
  socket.on('load-table', function(data){
    console.log(data);

  });

  // Cards client connected
  socket.on('load-cards', function(data){
    console.log(data);

  });
  // Capture message throw card from cards.html client
  socket.on('throw-card', function(data){
    console.log(data)
    socket.data = data;
    // Send messsage throw card from server to table client
    io.emit('throw-card-to-table', data);

  });


});

// Application listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});