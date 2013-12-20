
var $FriendsList;

$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	$listview = $("#listviewId");
	AjaxService = '../Ajax/AjaxService.php';		
	
	$("#newMessage").on( 'tap', tapnewMessage );	
		
	var params = {
		ObtenerSQL:ObtenerSQL,
		Text:  "Name",
		Value: "Id",
		Table: "oMessages"
		};
	//Todos los friends
	debugger;
	//cargarLista();
	
	//$FriendsList = $("#FriendsList").ListadoMensajes(params);
	//$FriendsList.Consultar();
}

function listViewClick(value)
{
	cargarLista(value, $("#description").val());
}

// Callback function references the event target and adds the 'tap' class to it
function tapnewMessage( event ) {
	$(event.target).addClass( "tap" );
	cargarLista("", $("#description").val());
}

function ObtenerSQL()
{
	sql = "SELECT P.Name as PName, P.Id, H.Name as HName  FROM opeople P JOIN op_hobbyes PH ON PH.IdPeople = P.Id  ";
	sql += " LEFT JOIN ohoobyes H ON H.Id = PH.Idhobbye ";
	
	return sql;
}

//*************************************************************************************************************************************************************************

function sendMessage()
{
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
		//,			html: html
	});
	
	var params = {
			IdReciber:seleccionado,
			IdSender: fromServer.People.Id,
			Message: $("#Message").val(),
			fnOK: sendMessageOK,
			fnNOK: sendMessageNOK
	};
	op_hobbyesSendMenssage(params);
}


function sendMessageOK(data) {
	$.mobile.loading( 'hide' );
	$("#btnCancel").click();
	//cargarLista();		
	if(!hayError(data))
	{
		//alert("Borrado");	
	}
}

function sendMessageNOK(httpRequest, textStatus, errorThrown) {
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
//**************************************************************************************************

function cargarLista()
{
	sql = " SELECT POw.Name, PF.Name, G.IdOwner, PG.IdPeople FROM ";	
	sql += " oGroup G JOIN oPGroup PG ON PG.Id = G.Id ";
	sql += " JOIN oPeople POw ON POw.Id = G.IdOwner ";
	sql += " JOIN oPeople PF ON PF.Id = G.IdPeople ";
	sql += " WHERE G.IdOwner = " + fromServer.People.Id;
	
	var params = {SQL:sql};
	AsyncConsultaSELECT(params, cargarListaOK, cargarListaNOK);	
}

function cargarListaOK(data) {	
	$.mobile.loading( 'hide' );		
	if(!hayError(data))
	{		
		dataToListado(data);		
	}
}


function dataToListado(data)
{	
	$listview.html('');	
	if (data.NumRegistros == 0) {
		var li = $('<li>');		
		li.text("No se encontraron registros.");
		$listview.append(li);
	}
	else {				
		for (var i = 0; i < data.NumRegistros; i++) {			
			addRow(data[i]);			
		}
	}	
	
	$listview.listview('refresh');	
}

function addRow(row)
{
	var linkDelete = '<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete</a>';
	var htmlImg = '<li class="ht" onclick="seleccionar(' + row.Id + ');" IdHobbie="'+ row.IdHobbie +'"><a href="#" ><h3>' + row.Name +'</h3><p>' + row.Name +'</p></a>' + linkDelete + '</li>';
	
	$listview.append(htmlImg);
}

//***************************************************************************************************************************

		
