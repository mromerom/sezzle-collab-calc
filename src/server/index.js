var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
    console.log('user connected');
    // socket.on('calc message', function(msg) {
    //     io.emit('message: ', msg);
    //     console.log('message: ' + msg);
    // })
})

http.listen(3001, function(){
  console.log('listening on *:3001');
});