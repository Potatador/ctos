$(document).ready(function(){
	var Socket = new WebSocket("ws://ctos.engynios.com/php/socket_server.php");

	Socket.onmessage = function (event) {
		alert(event);
	}

	Socket.onopen = function(event) {
		socketStatus.innerHTML = 'Conectado com: ' + event.currentTarget.URL;
		socketStatus.className = 'open';
	};

	Socket.onerror = function(error) {
    	console.log('Erro do WebSocket: ' + error);
  	};

	$('#comando').keydown(function(e){
		if(e.which == 13){
			Socket.send($(this).val());
		}
		$(this).val() = "";
	});
});