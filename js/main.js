var animationOn = false;

$(document).ready(function() {
	$('.quartos > rect, .quartos > g').each(function(index) {
		$(this).addClass('quarto' + index);
	});

	firebase.database().ref('userUID/quartos').once('value', function(snapshot) {
		snapshot.forEach(function(item) {
			var itemVal = item.val();

			if(itemVal.luzAcesa){
				$('.' + itemVal.className).addClass('luz-acesa');
				console.log($(itemVal.className));
			}
		});
	});

	$(document).keydown(function(e) {
		if(e.which == 27) {
			animationOn = true;
			if(!$(".is-vis").hasClass("perspective-on")) {
				$(".is-vis").addClass("perspective-on");
				$(".menu-opcoes").addClass("perspective-on-menu");	
			}
			else {
				$(".is-vis").removeClass("perspective-on");
				$(".menu-opcoes").removeClass("perspective-on-menu");		
			}

			desativaAnimacao();
		}
	});

	$(".menu-opcoes .opcao").mouseenter(function() {
		if(!animationOn) {
			let id = "#" + $(this).attr("opc");

			$(".is-vis").addClass("not-vis");
			$(".is-vis").removeClass("is-vis");
			$(".perspective-on").removeClass("perspective-on");

			$(id).parent().removeClass("not-vis");
			$(id).parent().addClass("is-vis");
			$(id).parent().addClass("perspective-on");
		}
	});

	$(".menu-opcoes .opcao").click(function() {
		animationOn = true;
		let id = "#" + $(this).attr("opc");
		setTimeout(function() {
			$(id).parent().removeClass("perspective-on");
			$(".menu-opcoes").removeClass("perspective-on-menu");
		}, 50);

		desativaAnimacao();
	});

	$(".quartos > rect, .quartos > g").click(function() {
		if($(this).hasClass("luz-acesa")) {
			$(this).removeClass("luz-acesa");
		}
		else {
			$(this).addClass("luz-acesa");
		}

		let quarto = $(this).hasClass('luz-acesa') ? this.className.baseVal.substring(this.className.baseVal.indexOf('quarto') + 6, this.className.baseVal.indexOf(' ')) : this.className.baseVal.substring(this.className.baseVal.indexOf('quarto') + 6);
		let data = {
			luzAcesa: $(this).hasClass('luz-acesa'),
			dataModificacao: firebase.database.ServerValue.TIMESTAMP,
			className: 'quarto' + quarto
		};
		firebase.database().ref('userUID/quartos/q_' + quarto).set(data);
	});

	$(".portas > rect, .dobradura-porta > path").click(function() {
		let nPorta = $(this).attr("class").substr($(this).attr("class").indexOf("porta") + 5, 1);
		// elemento DOM que faz parte do par, seja a dobradura ou
		// a porta
		let parObj = "none";
		if($(this).parent().hasClass("dobradura-porta"))
			parObj = $(this).parent().parent().children(".portas").children(".porta"+nPorta);
		else
			parObj = $(this).parent().parent().children(".dobradura-porta").children(".dobradura-porta"+nPorta);

		if($(this).hasClass("aberto")) {
			parObj.removeClass("aberto");
			$(this).removeClass("aberto");
		}
		else {
			parObj.addClass("aberto");
			$(this).addClass("aberto");
		}
	});

	$(".opcao > label > input[type='checkbox']").change(function() {
		var name = $(this).attr('name');
		if($(this).parent().hasClass('active'))
			$(this).parent().removeClass('active');
		else
			$(this).parent().addClass('active');
	});

	$('#scroll-bar > div').click(function() {
		$('#scroll-bar > div').each(function() {
			if($(this).hasClass('ativo'))
				$(this).removeClass('ativo');
		});

		if(!($(this).hasClass('ativo')))
			$(this).addClass('ativo');

		var andar = this.className.substring(0, this.className.indexOf('-andar'));

		$('#planta > .andar').each(function() {
			if(this.className.indexOf(andar) != -1) {
				if($(this).hasClass('hidden'))
					$(this).removeClass('hidden');

				if(!($(this).hasClass('ativo')))
					$(this).addClass('ativo');
			}
			else {	
				if($(this).hasClass('ativo')) {
					$(this).removeClass('ativo');
					$(this).addClass('hidden');
				}
			}
		});
	});
});

var desativaAnimacao = function() {
	setTimeout(function() {
		animationOn = false;
	}, 500);
}