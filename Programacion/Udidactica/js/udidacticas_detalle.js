$(document).ready(function() {
	documentReady();
});

function documentReady(){

	$(".boton").button();
			
	var paramsAsignatura ={
		Table: "asignaturas",
		Value: "Id", 
		Text: "Nombre",
		Default:{Text:"", Value:""}
	};
	
	AjaxService = '../' + AjaxService;
	$("#Asignatura").Cargar(paramsAsignatura);	
	
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

function guardar()
{	
	var paramsProcedure =
	[
		getMySQLText("Nombre"),
		getMySQLNumber("Asignatura"),
		getMySQLText("Observaciones")
	];
	
	var params = {paramsProcedure : paramsProcedure};
	params.fnNOK = guardarNOK;
	
	if(fromServer.UnidadDidactica && fromServer.UnidadDidactica.Id)
	{
			params.paramsProcedure.unshift(fromServer.UnidadDidactica.Id);
			params.fnCall = AsyncCallProcedure,
			params.Procedure =  'UnidadDidacticaUpdate';			
			params.fnOK = updateOK;
			
	}
	else
	{
			params.fnCall = AsyncCallProcedureScalar,
			params.Procedure = "UnidadDidacticaInsert";	
			params.fnOK = guardarOK;
	}

	ccb.feedBack.loading();	
	CallMySQL(params);
}

function updateOK(data) {
	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		$alert("Actualización correcta");
		parent.recargar(fromServer.UnidadDidactica.Id);
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
	$error("Error al guardar.\n" + textStatus + errorThrown.message);	
}

function UnidadDidacticaToDetalle(UDidacticaUpdate)
{
	fromServer.UnidadDidactica = UDidacticaUpdate;
	$("#Nombre").val(fromServer.UnidadDidactica.Nombre);
	$("#Asignatura").val(fromServer.UnidadDidactica.IdAsignatura);
	$("#Observaciones").val(fromServer.UnidadDidactica.Observaciones);
}





	

