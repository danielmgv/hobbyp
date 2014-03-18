
$(document).bind('pageinit', function(){retrieveParams();	pageinit();	});

function pageinit(){	
	$listview = $("#listviewId");
	AjaxService = '../Ajax/AjaxService.php';		
	$("#btnEnviar").on( 'tap', sendMessage );	
	$("#ParaParam").val(fromServer.ToName);
}

//*************************************************************************************************************************************************************************
function sendMessage()
{
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
	});

	oMessages.Fields.Asunto = $("#AsuntoParam").val();
	//oMessages.Fields.IdOrigen = null;//Id de mensaje a que se responde
	//oMessages.Fields.Fecha = new Date();
	oMessages.Fields.Mensaje = $("#MensajeParam").val();
	oMessages.Fields.De = fromServer.People.Id;
	oMessages.Fields.Para =fromServer.To;
	
	oMessages.Insert();		
}

function oMessagesInsertOK(data) {
	$.mobile.loading( 'hide' );
	$("#btnCancel").click();
	
	if(!hayError(data))
	{
		alert("Enviado");	
		fromServer.To = undefined;
		fromServer.ToName = undefined;
		window.history.back();
	}
}

function oMessagesInsertNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );

	if(httpRequest.status = 500)
	{
		try{
			var errorJson = JSON.parse(httpRequest.responseText);
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

//**************************************************************************************************



		
