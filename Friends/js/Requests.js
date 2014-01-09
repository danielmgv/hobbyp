

//**********************************************************************************************************************

function ConsultarMyRequests()
{	
	var sql = " SELECT R.IdOwner, R.Description, P.Name as OwnerName FROM oRequest R JOIN opeople P ON P.Id = R.IdOwner WHERE R.IdPeople = " + fromServer.People.Id;	
	AsyncConsultaSELECT({SQL:sql}, ConsultarMyRequestsOK, ConsultarMyRequestsNOK);	
}

function ConsultarMyRequestsOK(data) {
	$.mobile.loading( 'hide' );
	
	try{
		if(!hayError(data))
		{
			if(data.NumRegistros > 0)
			{
				var linkR = '<a href="Requests.html">Tiene ' + data.NumRegistros + ' solicitudes de amistad</a>';
				$("#lblMyRequests").html(linkR);
				CargarMyRequestsList(data);
			}
		}
	}
	catch(err)
	{
		alert(err.message);
	}
}

function ConsultarMyRequestsNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );
	if(!hayError(httpRequest.responseText))
	{
		alert("Error al mandar el mensaje.\n" + httpRequest.responseText + textStatus + errorThrown.message);	
	}
}
//*****************************************************************************************************************************************
function CargarMyRequestsList(data) {
	for (var i = 0; i < data.NumRegistros; i++) {			
		addRowMyRequestsList(data[i]);			
	}
	
	//$("#MyRequestsList").listview('refresh');	
}

function addRowMyRequestsList(row)
{	
	var $li = $("<li>");
	var htmlLi = '<a href="#" onclick="alert(\'the item!\');">';
	htmlLi += "<h3>The item</h3>";
	htmlLi += "</a>";
	htmlLi += '<a href="#" onclick="alert(\'1st splitbutton!\');" class="split-button-custom" data-role="button" data-icon="gear" data-iconpos="notext">1st link</a>';
	htmlLi += '<a href="#" onclick="alert(\'2nd splitbutton!\');" class="split-button-custom" data-role="button" data-icon="arrow-r" data-iconpos="notext">2nd link</a>';
					    
	
	var linkList = '<a href="#" alt="' + $.trim(row.Description)  + '" onclick="alert(\'' + row.OwnerName + '\')"><h3>' + row.OwnerName + '</h3><p>' + $.trim(row.Description) + '</p></a>';
	//var $controlgroup = $('<div data-role="controlgroup" data-type="horizontal">'); 
	var linkAceptar = '<a href="#" onclick="oRequestAceptar(' + row.IdOwner + ');" class="split-button-custom" data-role="button" data-icon="gear" data-iconpos="notext"></a>';   
	var linkRechazar = '<a href="#" onclick="oRequestUpdateEstado(' + row.IdOwner + ', 2);" class="split-button-custom" data-role="button" data-icon="arrow-r" data-iconpos="notext"></a>';
	//$controlgroup.append(linkAceptar + linkRechazar);
	$li.append(linkList + linkAceptar + linkRechazar);
	//$li.append($controlgroup);
	$("#MyRequestsList").append($li.append(htmlLi));
	$("#MyRequestsList").listview('refresh');	
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
		$FriendsList.Consultar();
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
