$(document).on('ready', function(){

	var websocket = io.connect("/");
	var name_user = "viewer";

	websocket.on('connect', function(){
		init();
	});

	$('#btnlogin').on('click',function(evt){
		evt.preventDefault();
		var user = $('#user').val();
		$('#user').val('');
		if(user.replace(" ","") != ""){
			websocket.emit('set_user', user);
		}
	});

	var init = function (){

		$(".alert").hide();
		$("textarea").tabby();
		$('#console').keyup(function(evt){
			var text = $('#console').val()
			websocket.emit('writeText', text, name_user);	
		});

		websocket.on('receiveText', receiveText);

		websocket.on('new_manager', function (manager){
			addElementSelect(manager);			
		});

		websocket.on('remove_manager', function (manager){
			removeElementSelect(manager);			
		});

		websocket.on('full_user', function (list_manager){
			for(var i in list_manager){
				$('#user_manager').append('<option value="'+ list_manager[i] +'">'+ list_manager[i] +'</option>');
			}
		});

		websocket.on('receiveText', receiveText);

		websocket.on('name_user', function (nameuser){
			name_user = nameuser;
			$('#name_user').append("Bienvenido " + name_user);
			$("#login").hide();
			$(".alert").show();
		});

		websocket.on('error_name_user', function (message){
			alert(message);
		});		
	}

	function receiveText(text, manager){
		if($('#user_manager option:selected').val() == manager){
			$('#console').val(text);
		}
	}

	function addElementSelect(manager){
		$('#user_manager').append('<option class="option" value="'+ manager +'">'+ manager +'</option>');
	}

	function removeElementSelect(manager){
		 $("#user_manager option[value='" + manager + "']").remove();  
	}



});