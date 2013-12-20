var paramsAsignatura ={
	Table: "asignaturas",
	Value: "Id", 
	Text: "Nombre",
	Default:{Text:"", Value:""}
};

var paramsUDidactica ={
	Table: "unidadesdidacticas",
	Value: "Id", 
	Text: "Nombre",
	JoinField: "IdAsignatura",
	JoinValue: "",
	Default:{Text:"", Value:""}
};
	
$(document).ready(function() {
	documentReady();
});

function documentReady(){
	AjaxService = '../' + AjaxService;
	
	$(".boton").button();
	
	//ALTA
	if(!fromServer.Control || !fromServer.Control.Id)
	{
		$("#Asignatura").Cargar(paramsAsignatura);
		$("#UDidactica").Cargar(paramsUDidactica);	
	}

	$('textarea[maxlength]').keyup(function(){   
		//get the limit from maxlength attribute   
		var limit = parseInt($(this).attr('maxlength'));   
		//get the current text inside the textarea   
		var text = $(this).val();   
		//count the number of characters in the text   
		var chars = text.length;   

		//check if there are more characters then allowed   
		if(chars > limit){   
		//and if there are use substr to get the text before the limit   
		var new_text = text.substr(0, limit);   

		//and change the current text with the new text   
		$(this).val(new_text);   
		}   
	});	
}

function changeAsignatura(asignatura)
{
	paramsUDidactica.JoinValue = asignatura;
	$("#UDidactica").Cargar(paramsUDidactica);		
}

function guardar()
{	
	var paramsProcedure =
	[
		getMySQLText("Nombre"),		
		getMySQLNumber("UDidactica"),
		getMySQLNumber("Tipo"), //Teorico, Práctico
		getMySQLNumber("Asignatura"),
		getMySQLNumber("Modo"),
		getMySQLText("Observaciones")
	];

	var params = {paramsProcedure : paramsProcedure};
	
	if(fromServer.Control && fromServer.Control.Id)
	{
			params.paramsProcedure.unshift(fromServer.Control.Id);
			params.Procedure = 'ControlUpdate';
			params.fnCall = AsyncCallProcedure,
			params.fnOK = updateOK;
			params.fnNOK = updateNOK;
	}
	else
	{
			params.fnCall = AsyncCallProcedureScalar,
			params.Procedure = "ControlInsert";	
			params.fnOK = guardarOK;
			params.fnNOK = guardarNOK;
	}

	ccb.feedBack.loading();	
	CallMySQL(params);
}

function updateOK(data) {	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		$alert("Actualización correcta");
		parent.recargar(fromServer.Control.Id);
	}
}

function updateNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		$error("Error al actualizar.<br/>" + data.Error);
	}
	catch(any)
	{
		$error("Error al actualizar.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}

function guardarOK(data) {
	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		$alert("Alta correcta");
		parent.recargar(data["0"].Id);
	}
}

function guardarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		$error("Error al realizar el alta.<br/>" + data.Error);
	}
	catch(any)
	{
		$error("Error al realizar el alta.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}

function ControlToDetalle(Control)
{	
	fromServer.Control = Control;

	paramsAsignatura.Selected = Control.IdAsignatura;
	paramsUDidactica.JoinValue = Control.IdAsignatura;
	paramsUDidactica.Selected = Control.IdUnidadDidactica;
	$("#Asignatura").Cargar(paramsAsignatura);	
	$("#UDidactica").Cargar(paramsUDidactica);			
	$("#Nombre").val(Control.Nombre);		
	$("#Observaciones").val(Control.Observaciones);
}





	

