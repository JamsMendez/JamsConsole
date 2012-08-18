module.exports = function(server){
	
	server.get('/', function(request, response){
		response.render('index.jade', {
			title: 'JamsConsole'
		});
	});

	server.get('/app', function(request, response){
		response.render('app_console.jade');
	});
}