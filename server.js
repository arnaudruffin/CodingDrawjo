#!/bin/env node
var app = require('./app')
var http = require('http').Server(app);
var io = require('socket.io')(http);

var history = [];
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('ijustdrewsomething', function(data) {
        history.push(data);
        socket.broadcast.emit('remoteuserdrewsomething', data);
    });
    socket.on('clear_all', function(){
        history.splice(0);
        socket.broadcast.emit('clear_all');
    });
    for(var idx = 0; idx < history.length; idx++){
        socket.emit('remoteuserdrewsomething', history[idx]);
    }
});


http.listen(8080, null, function(){
    console.log('listening on '+ '*:'+8080);
});

