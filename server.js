
var express = require('express'),
	io = require('socket.io'),
	http = require('http');

var PORT = 3000;

//var server = express.createServer();
//server.listen(PORT);
var app = express();
var server = http.createServer(app);
var socket_io = io.listen(server);

server.listen(PORT);

app.configure(function(){
	app.set('views', __dirname + '/view');
	app.set('view options', { layout: false});
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/static'));	
});

require('./router/router')(app);
require('./socket_io/socket')(socket_io);
