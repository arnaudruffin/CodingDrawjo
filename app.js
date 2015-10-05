var path = require('path');
var express = require('express');
var app = express();


app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    console.log("serving index");
    res.render('index')
});

app.get('/draw', function(req, res){
    console.log("serving draw");
    res.render('draw')
});

module.exports = app;




