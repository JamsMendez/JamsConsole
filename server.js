var express = require('express'),
	io = require('socket.io');

var PORT = 3000;

server = express.createServer();
server.listen(PORT);

socket_io = io.listen(server);

server.configure(function(){
	server.set('views', __dirname + '/view');
	server.set('view options', { layout: false});
	server.use(express.static(__dirname + '/public'));
	server.use(express.static(__dirname + '/static'));	
});

require('./router/router')(server);
require('./socket_io/socket')(socket_io);