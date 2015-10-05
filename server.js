#!/bin/env node
var app = require('./app')
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('ijustdrewsomething', function(data) {
        socket.broadcast.emit('remoteuserdrewsomething', data);
    });
});


http.listen(8080, null, function(){
    console.log('listening on '+ '*:'+8080);
});

