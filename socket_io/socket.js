module.exports = function(socket_io) {
	
	//Arreglo para almacenar los usuarios
	var users = new Array();

	//Quitar el debug de la consola
	socket_io.configure(function(){
		socket_io.disable('log');
	});

	socket_io.sockets.on('connection',function(socket){

		
		console.log("Nuevo socket: " + users);

		socket.emit('full_user', users);

		socket.nameuser = 'viewer';

		socket.on('set_user', function (nameuser){
			if(isnameValid(nameuser)){
				socket.nameuser = nameuser;

				addManager(socket.nameuser);

				socket.emit('name_user', socket.nameuser);
				
				var index = users.length;
				users[index] = socket.nameuser;

			}else{
				socket.emit('error_name_user', socket.nameuser + ' ya existe');
			}
		});

		socket.on('writeText', sendText);

		socket.on('disconnect', function() {
			var i = users.indexOf(socket.nameuser);
			users.splice(i, 1);
			removeManager(socket.nameuser);
		});

	});

	function addManager(manager){
		socket_io.sockets.emit('new_manager', manager);
	}

	function removeManager(manager){
		socket_io.sockets.emit('remove_manager', manager);
	}

	function sendText(text, manager){
		socket_io.sockets.emit('receiveText', text, manager);
	}

	var isnameValid = function(nameuser){
		var clients = socket_io.sockets.clients();
		for (var client in clients) {
			if(clients.hasOwnProperty(client)){
				client = clients[client];
				if(client.nameuser == nameuser){
					return false;
				}
			}	
		}
		return true;
	}
}