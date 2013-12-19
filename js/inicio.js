
var loginUser;

$(document).ready(function() {
	documentReady();
});

function documentReady(){	
	CargarCombos();
	var periodo = obtenerPeriodoCurso();
	$("#lblPeriodo").text(obtenerPeriodoCurso());
	
	$("#menu").menu({
	select: function(event, ui) { 
		$("#pantalla").attr("src", ui.item.attr("destino"));				
	}}
	);
}

function login(user)
{
	loginUser =	user;
	$("#tblMenu").show();
}

function CargarCombos()
{
	AjaxService = 'Ajax/AjaxService.php';
	
	var paramsAsignatura = {
		Table: "asignaturas",
		Value: "Id", 
		Text: "Nombre",
		Default:{Text:"", Value:""}
	};
	$("#nada").Cargar(paramsAsignatura);	
	
}
	