
var $listviewRecibidos;
var $listviewEnviados;

$(document).bind('pageinit', function(){retrieveParams(); 	pageinit();	});

function pageinit(){	
	$listview = $("#listviewId");

	//$("#newMessage").on( 'tap', tapnewMessage );	
	//$("#btnEnviar").on( 'tap', sendMessage );	
	//$("#dialogReply").dialog();
	
	var params = {
		Clave: "IdMessage",
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
		Clave: "Id"
		};
		
	$listviewEnviados = $("#ListIdEnviados").ListadoMensajesEnviados(paramsEnviados);
	$listviewEnviados.Consultar();	
}

function ObtenerSQLRecibidos()
{
	sql =  " SELECT M.Id as IdMessage, Asunto, Mensaje, M.Fecha, P.Name as DeNombre ";
	sql += " FROM oMessages M JOIN opeople P ON P.Id = M.De ";
	sql += " WHERE M.Para = " + fromServer.People.Id;
	sql += " AND M.EstadoPara <> 2 ";

	return sql;
}

function ObtenerSQLEnviados()
{
	sql =  " SELECT * ";
	sql += " FROM oMessages ";
	sql += " WHERE De = " + fromServer.People.Id;
	
	return sql;
}

//***************************************************************************************************************************
function oMessageDelete(IdMessage)
{
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
	});

	oMessages.KeyField.Id = IdMessage;	
	
	if(confirm("Realmente desea eliminar el mensaje?"))
		oMessages.Delete();
		//oMessages.Procedure("oMessagesEliminarRecibido", params);		
}

function oMessagesDeleteOK(data) {
	$.mobile.loading( 'hide' );
	$("#btnCancel").click();

	if(!hayError(data))
	{
		//alert("Borrado");
		$listviewEnviados.Consultar();	
		//$listviewRecibidos.Consultar();		
	}
}

function oMessagesDeleteNOK(httpRequest, textStatus, errorThrown) {
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
		alert("Error al borrar el mensaje.\n" + textStatus + errorThrown.message);	
	}
}
//***************************************************************************************************************************************
var IdMensajeReply = 0;
var IdPeopleReply = 0;

function ResponderMensaje(IdMensajeReply, asunto, IdPeopleReply)
{
	IdMensajeReply = IdMensajeReply;
	IdPeopleReply = IdPeopleReply;
	$("#asuntoReply").val("Re: " + asunto);
	$("#lnkDialogReply").click();
}

function replyClick(){
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
	});
	var params={
		 Asunto:$("#asuntoReply").text()
		,IdOrigenParam: IdMensajeReply
	    ,FechaParam: new Date()
		,MensajeParam: $("#respuesta").text()
		,DeParam: fromServer.People.Id
		,ParaParam: IdPeopleReply
	};
	
	oMessages.Insert(params);		
}

//*************************************************************************************************************************************
function EnviarMensaje (To,ToName) {
  fromServer["To"] = To;
  fromServer["ToName"] = ToName;  
  hrefParams('NewMessage.html');
}

