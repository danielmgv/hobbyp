		
$(document).ready(function() {
	documentReady();
});

function documentReady(){	
	AjaxService = '../' + AjaxService;
	
	$("#tabs").tabs();
	
	if(fromServer.UnidadDidactica.Id == "")
	{
		$('#tabs ul li:nth-child(1) a').text('Nueva');
	}
	else
	{
		$('#tabs ul li:nth-child(1) a').text('Unidad didáctica');
		$("#tab1Frame").load(
			function()
			{
				recargar(fromServer.UnidadDidactica.Id);	
			}
		);							
		$("#tab2").show();		
		//$("#tab2Frame").attr("src", "controles_realizar.php");
	}
	
	$("#tab1Frame").attr("src", "udidacticas_detalle.php");
}

function recargar(id)
{
	recargarUdidactica(id);
}

function recargarUdidactica(id)
{
    ccb.feedBack.loading();
	var sql = "SELECT UD.Id, UD.Nombre, UD.Observaciones, UD.IdAsignatura ";//, E.Nombre, M.Nombre ";
	var sqlFROM = " FROM unidadesdidacticas UD";
	//sqlFROM += " LEFT JOIN Evaluaciones E ON E.Id = C.Evaluacion ";
	//sqlFROM += " LEFT JOIN Materias M ON M.Id = C.Materia ";
	var sqlWhere = " where UD.Id = " + id;
	
	SyncConsultaSELECT({ SQL: sql + sqlFROM + sqlWhere }, recargarOK, recargarNOK);
}

function recargarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	$error("Error al cargar.\n" + textStatus + errorThrown);
}

function recargarOK(data) {
	ccb.feedBack.endLoading();
	
	if(data.Error != '' && data.Error != undefined)
	{
		$error("Error al cargar.\n" + data.Error);
	}
	else if(data.NumRegistros == 0)
	{		
		$error("No se encontró.");
	}
	else
	{	
		fromServer.UnidadDidactica = data["0"];
		document.getElementById('tab1Frame').contentWindow.UnidadDidacticaToDetalle(fromServer.UnidadDidactica);
	}

}



