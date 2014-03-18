
$(document).bind('pageinit', function(){retrieveParams();	pageinit();	});

function pageinit(){
	AjaxService = '../Ajax/AjaxService.php';			
	$("#btnEnviar").on( 'tap', tapEnviar );		
	CargarFriends();	
}

function tapEnviar( event ) {
	$(event.target).addClass( "tap" );
	sendMessage();
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
	
	oMessages.Fields.Asunto = $("#Asunto").val();
	//oMessages.Fields.IdOrigen = null;//Id de mensaje a que se responde
	//oMessages.Fields.Fecha = new Date();
	oMessages.Fields.Mensaje = $("#Mensaje").val();
	oMessages.Fields.De = fromServer.People.Id;
	oMessages.Fields.Para = $("#Para").val();

	oMessages.Insert();	
}

function oMessagesInsertOK(data) {
	$.mobile.loading( 'hide' );
	//$("#btnCancel").click();	
	if(!hayError(data))
	{
		alert("Mensaje enviado");
		window.history.back();
	}
}

function oMessagesInsertNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );
	//cargarLista();
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
//********************************************************************************************************************

function CargarFriends(){
	var paramsFriendsList = {
		ObtenerSQL: ObtenerSqlFriends,
		Titulo:  "FriendName",
		Clave: "FriendId"
		};
	var $FriendsList = $("#Para").ListviewLoad(paramsFriendsList);
	$FriendsList.Consultar();		
}

function ObtenerSqlFriends()
{
	var sql = "SELECT DISTINCT IF(G.IdOwner = " + fromServer.People.Id + ", PG.IdPeople, G.IdOwner) as FriendId,  ";
	sql += " IF(G.IdOwner = " + fromServer.People.Id + ", PPeople.Name, POwner.Name) as FriendName ";
	sql += " FROM `op_Group` PG ";
	sql += " JOIN oGroup G ON PG.IdGroup = G.Id ";
	sql += " JOIN opeople POwner ON G.IdOwner = POwner.Id ";
	sql += " JOIN opeople PPeople ON PG.IdPeople = PPeople.Id ";
	sql += " Where ";
	sql += " G.IdOwner = " + fromServer.People.Id + " Or PG.IdPeople = " + fromServer.People.Id;	
	sql += " AND IF(G.IdOwner = " + fromServer.People.Id + ", PG.IdPeople, G.IdOwner) <> " + fromServer.People.Id;
	return sql;
}
//********************


		
