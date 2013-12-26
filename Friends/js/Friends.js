
var $FriendsList;
var $NewFriendList;
var oRequest;
var $MyRequestsList;
$(document).bind('pageinit', function(){retrieveParams();	pageinit();	});

function pageinit(){
	
	oRequest = new BDEntity("oRequest");	
	$FriendsList = $("#FriendsList");
	$NewFriendList = $("#NewFriendList");
	AjaxService = '../Ajax/AjaxService.php';		
	$("#btnBuscarNew").on( 'tap', btnBuscarNewTap );			
			
	var params = {
		ObtenerSQL:ObtenerSQL,
		fnOnLoad: fnOnLoad,
		Text:  "Name",
		Value: "Id",
		Table: "oMessages"
		};

	$MyRequestsList = $("#MyRequestsList").Listado(params);
	$MyRequestsList.Consultar();		
}

function fnOnLoad(data)
{
	if(data.NumRegistros > 0)
	{
		var linkR = '<a href="Requests.html">Tiene ' + data.NumRegistros + ' solicitudes de amistad</a>';	
		$("#lblMyRequests").html(linkR);
	}
}	
//******************************************************************************************************************************************************************************
function listViewClick(value)
{
	cargarLista(value, $("#description").val());
}

function btnBuscarNewTap()
{	
	cargarListaNew();
}

// Callback function references the event target and adds the 'tap' class to it
function tapnewMessage( event ) {
	$(event.target).addClass( "tap" );
	cargarLista("", $("#description").val());
}

function ObtenerSQL()
{
	var sql = " SELECT R.IdOwner, R.Description, P.Name as OwnerName FROM oRequest R JOIN opeople P ON P.Id = R.IdOwner WHERE R.IdPeople = " + fromServer.People.Id;	
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
	var sql = " SELECT POw.Name, PF.Name, G.IdOwner, PG.IdPeople FROM ";	
	sql += " oGroup G JOIN op_Group PG ON PG.IdGroup = G.Id ";
	sql += " JOIN opeople POw ON POw.Id = G.IdOwner ";
	sql += " JOIN opeople PF ON PF.Id = G.IdPeople ";
	sql += " WHERE G.IdOwner = " + fromServer.People.Id;
	sql += " AND PF.Name LIKE '%" + $("#searchNew").val() + "%'";
	
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

function cargarListaNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	alert("Error al cargar lista.\n" + sql + " " + textStatus + errorThrown.message + httpRequest.responseText);	
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
function cargarListaNew()
{
	var sql = "SELECT Id, Name FROM opeople ";	
	sql += " WHERE Name LIKE '%" + $("#searchNew").val() + "%'";
	
	var params = {SQL:sql};
	AsyncConsultaSELECT(params, cargarListaNewOK, cargarListaNewNOK);	
}

function cargarListaNewOK(data) {	
	$.mobile.loading( 'hide' );		
	if(!hayError(data))
	{		
		dataToListadoNew(data);		
	}
}

function cargarListaNewNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	alert("Error al cargar lista.\n" + sql + " " + textStatus + errorThrown.message + httpRequest.responseText);	
}


function dataToListadoNew(data)
{	
	$NewFriendList.html('');	
	if (data.NumRegistros == 0) {
		var li = $('<li>');		
		li.text("No se encontraron registros.");
		$NewFriendList.append(li);
	}
	else {				
		for (var i = 0; i < data.NumRegistros; i++) {			
			addRowNew(data[i]);			
		}
	}	
	
	$NewFriendList.listview('refresh');	
}

function addRowNew(row)
{
	//var linkDelete = '<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Add</a>';
	//var htmlImg = '<li class="ht" onclick="seleccionar(' + row.Id + ');" IdHobbie="'+ row.Id +'"><a href="#" ><h3>' + row.Name +'</h3><p>' + row.Name +'</p></a>' + linkDelete + '</li>';
	
	var linkAddRequest = '<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Add</a>';
	var htmlImg = '<li class="ht" onClick="NewRequest(' + row.Id + ');" IdPeople="'+ row.Id +'">' + row.Name + '</li>';
	
	$NewFriendList.append(htmlImg);
}

//********************************************************************************************************************************************************

function NewRequest(IdPeople)
{	
	if(confirm("¿Desea mandar la solicitud de amistad?"))
	{
		var params = {a:fromServer.People.Id, b:IdPeople, c: $("#MensajeParam").text()};
		oRequest.Insert(params);
	}
}


function oRequestInsertOK(data) {	
	$.mobile.loading( 'hide' );		
	if(!hayError(data))
	{		
		alert("InsertOK");
	}
}

function oRequestInsertNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	if(!hayError(httpRequest.responseText))
	{		
		alert("Error al insertar\n" + textStatus + errorThrown.message + httpRequest.responseText);	
	}
}

//***************************************************************************************************************************


		
