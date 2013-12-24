

//**********************************************************************************************************************

function ConsultarMyRequests()
{	
	var sql = " SELECT R.IdOwner, R.Description, P.Name as OwnerName FROM oRequest R JOIN opeople P ON P.Id = R.IdOwner WHERE R.IdPeople = " + fromServer.People.Id;	
	AsyncConsultaSELECT({SQL:sql}, ConsultarMyRequestsOK, ConsultarMyRequestsNOK);	
}

function ConsultarMyRequestsOK(data) {
	$.mobile.loading( 'hide' );
	if(!hayError(data))
	{
		if(data.NumRegistros > 0)
		{
			var linkR = '<a href="Requests.html">Tiene ' + data.NumRegistros + ' solicitudes de amistad</a>';
			$("lblMyRequests").append(linkR);
			CargarMyRequestsList(data);
		}		
	}
}

function ConsultarMyRequestsNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );
	//cargarLista();
	if(httpRequest.status = 500)
	{
		try{
			var errorJson = eval(httpRequest.responseText);
			alert(errorJson.Error);
		}
		catch(any){
			alert(httpRequest.responseText);		
		}	
	}
	else
	{		
		alert("Error al mandar el mensaje.\n" + textStatus + errorThrown.message);	
	}
}
//*****************************************************************************************************************************************
function CargarMyRequestsList(data) {
	for (var i = 0; i < data.NumRegistros; i++) {			
		addRowMyRequestsList(data[i]);			
	}
	
	$("#MyRequestsList").listview('refresh');	
}

function addRowMyRequestsList(row)
{	
	var $li = $("<li>");
	var linkList = '<a href="#" alt="' + $.trim(row.Description)  + '" onclick="alert(\'' + row.OwnerName + '\')"><h3>' + row.OwnerName + '</h3></a>';

	var linkAceptar = '<a href="#" onclick="oRequestAceptar(' + row.IdOwner + ');" class="split-button-custom" data-role="button" data-icon="gear" data-iconpos="notext">1st link</a>';   
	var linkRechazar = '<a href="#" onclick="oRequestUpdateEstado(' + row.IdOwner + ', 2);" class="split-button-custom" data-role="button" data-icon="arrow-r" data-iconpos="notext">2st link</a>';
	$li.html(linkList + linkAceptar + linkRechazar);	
	$("#MyRequestsList").append($li);	
}
//********************************************************************************************************************************************************
function oRequestAceptar(IdOwner)
{	
	var mensajeConfirm  = "¿Desea aceptar la solicitud de amistad?";

	if(confirm(mensajeConfirm))
	{
		var params = {a:fromServer.People.Id, b:IdOwner};
		oRequest.Procedure("oRequestAceptar", params);
	}
}

function oRequestAceptarOK(data) {	
	$.mobile.loading( 'hide' );		
	if(!hayError(data))
	{
		ConsultarMyRequests();
	}
}

function oRequestAceptarNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	if(!hayError(httpRequest.responseText))
	{		
		alert("Error al procesar la solicitud\n" + textStatus + errorThrown.message + httpRequest.responseText);	
	}
}
//***************************************************************************************************************************
function oRequestUpdateEstado(IdOwner, estado)
{	
	var mensajeConfirm  = "¿Desea aceptar la solicitud de amistad?";
	if(estado == 2)
	{
		mensajeConfirm  = "¿Desea rechazar la solicitud de amistad?";		
	}

	if(confirm(mensajeConfirm))
	{
		var params = {a:fromServer.People.Id, b:IdOwner, Estado: estado};
		oRequest.Procedure("oRequestUpdateEstado", params);
	}
}

function oRequestUpdateEstadoOK(data) {	
	$.mobile.loading( 'hide' );		
	if(!hayError(data))
	{
		ConsultarMyRequests();
	}
}

function oRequestUpdateEstadoNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	if(!hayError(httpRequest.responseText))
	{		
		alert("Error al procesar la solicitud\n" + textStatus + errorThrown.message + httpRequest.responseText);	
	}
}
//***************************************************************************************************************************
