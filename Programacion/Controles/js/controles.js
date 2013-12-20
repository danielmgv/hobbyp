		
$(document).ready(function() {
	documentReady();
});

function documentReady(){	
	AjaxService = '../' + AjaxService;
	
	$("#tabs").tabs();
	
	if(fromServer.Control.Id == "")
	{
		$('#tabs ul li:nth-child(1) a').text('Nuevo');
	}
	else
	{
		$('#tabs ul li:nth-child(1) a').text('Control');
		$("#tab1Frame").load(
			function()
			{
				recargar(fromServer.Control.Id);	
			}
		);							
		$("#tab2").show();		
		//$("#tab2Frame").attr("src", "controles_realizar.php");
	}
	
	$("#tab1Frame").attr("src", "controles_detalle.php");
}

function recargar(idControl)
{
	recargarControl(idControl);
}

function recargarControl(idControl)
{
    ccb.feedBack.loading();
	var sql = "SELECT C.Id, C.Nombre, C.Observaciones, C.IdAsignatura, C.IdUnidadDidactica ";		
	sql += " FROM controles C ";
//	sqlFROM += " LEFT JOIN Evaluaciones E ON E.Id = C.Evaluacion ";
//	sqlFROM += " LEFT JOIN Materias M ON M.Id = C.Materia ";
	sql +=  " where C.Id = " + idControl;	

	SyncConsultaSELECT({ SQL: sql }, recargarOK, recargarNOK);
}

function recargarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		$error("Error al cargar.<br/>" + data.Error);
	}
	catch(any)
	{
		$error("Error al cargar.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}

function recargarOK(data) {
	ccb.feedBack.endLoading();
	
	if(data.Error != '' && data.Error != undefined)
	{
		$alert("Error al cargar.\n" + data.Error);
	}
	else if(data.NumRegistros == 0)
	{		
		$alert("No se encontró.");
	}
	else
	{
		fromServer.Control = data["0"];
		document.getElementById('tab1Frame').contentWindow.ControlToDetalle(fromServer.Control);
	}

}



