
var $listviewRecibidos;
var $listviewEnviados;

$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	$listview = $("#listviewId");
	AjaxService = '../Ajax/AjaxService.php';		
	
	//$("#newMessage").on( 'tap', tapnewMessage );	
	$("#btnEnviar").on( 'tap', sendMessage );	
	
	var params = {
		ObtenerSQL:ObtenerSQLRecibidos,
		Text:  "Name",
		Value: "Id",
		Table: "oMessages"
		};
	//debugger;
	//Todos los recibidos
	$listviewRecibidos = $("#ListIdRecibidos").ListadoMensajes(params);
	$listviewRecibidos.Consultar();
	
	var paramsEnviados = {
		ObtenerSQL:ObtenerSQLEnviados,
		Text:  "Name",
		Value: "Id",
		Table: "oMessages"
		};
		
	$listviewEnviados = $("#ListIdEnviados").ListadoMensajes(params);
	$listviewEnviados.Consultar();	
}

function ObtenerSQLRecibidos()
{
	sql =  " SELECT * ";
	sql += " FROM oMessages ";
	sql += " WHERE Para = " + fromServer.People.Id;
	
	return sql;
}

function ObtenerSQLEnviados()
{
	sql =  " SELECT * ";
	sql += " FROM oMessages ";
	sql += " WHERE De = " + fromServer.People.Id;
	
	return sql;
}

//*************************************************************************************************************************************************************************

function sendMessage()
{
	debugger;
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
		//,			html: html
	});
	var params={
		 IdOrigenParam: null
	    ,FechaParam: new Date()
		,MensajeParam: $("#MensajeParam").text()
		,DeParam: fromServer.People.Id
		,ParaParam: $("#ParaParam").val()
	};
	
	AsyncCallProcedureScalar(getSqlProcedure("oMessagesInsert", params), sendMessageOK, sendMessageNOK);
}

function sendMessageOK(data) {
	$.mobile.loading( 'hide' );
	$("#btnCancel").click();
	
	if(!hayError(data))
	{
		alert("Enviado");	
		$listviewEnviados.Consultar();	
	}
}

function sendMessageNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );

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

//**************************************************************************************************



		
