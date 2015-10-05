#!/bin/env node
var app = require('./app')
var http = require('http').Server(app);

http.listen(8080, null, function(){
    console.log('listening on '+ '*:'+8080);
});

