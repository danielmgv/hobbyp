

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
	var linkList = '<a href="#" alt="' + row.Description + '" onclick="alert("' + row.OwnerName + '")"><h3>' + row.OwnerName + '</h3></a>';

	var linkAceptar = '<a href="#" onclick="AceptarRequest(' + row.IdOwner + ');" class="split-button-custom" data-role="button" data-icon="gear" data-iconpos="notext">1st link</a>';   
	var linkRechazar = '<a href="#" onclick="RechazarRequest(' + row.IdOwner + ');" class="split-button-custom" data-role="button" data-icon="arrow-r" data-iconpos="notext">2st link</a>';
	$li.append(linkList + linkAceptar + linkRechazar);	
	$("#MyRequestsList").append($li);	
}
//********************************************************************************************************************************************************
function AceptarRequest(IdOwner)
{	
	if(confirm("¿Desea aceptar la solicitud de amistad?"))
	{
		var params = {a:fromServer.People.Id, b:IdOwner, Estado: 1};
		oRequest.Procedure("oRequestAceptar", params);
	}
}

function oRequestAceptarOK(data) {	
	$.mobile.loading( 'hide' );		
	if(!hayError(data))
	{		
		alert("Solicitud aceptada OK");
	}
}

function oRequestAceptarNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	if(!hayError(httpRequest.responseText))
	{		
		alert("Error al aceptar solicitud\n" + textStatus + errorThrown.message + httpRequest.responseText);	
	}
}
//***************************************************************************************************************************


		
