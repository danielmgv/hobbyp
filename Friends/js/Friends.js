//DEFINE
var $FriendsList, $NewFriendList, $MyRequestsList;

function pageinit(){	
	$NewFriendList = $("#NewFriendList");
	$("#btnBuscarNew").on( 'tap', btnBuscarNewTap );	

	//debugger;
	BuscarPeticionesAmistad();
	
	// Cargar lista de friends
	BuscarFriends();	
	
		var params = {
		ObtenerSQL: ObtenerSql,
		Titulo:  "Name",
		Clave: "Id"
	};
	
	var $lvHobbies2 = $("#lvHobbies2").LvHobbiesLoad(params);
	$lvHobbies2.Consultar();		
}
//*************************************************************************************************************
function btnSendClick(){		
	var email = $("#Email").val();
	        
	if(confirm("Desea inviatar a "+ email +" a unirse a hobbyp?"))
	{
		var data ={Email: email};
		
		opeople.Procedure("opeopleGetByEmail", data);	
	}
}

function opeopleGetByEmailOk(data)
{
	if(data.NumRegistros > 0)
	{
		var params = {a:fromServer.People.Id, b:data["1"].IdPeople, c: $("#MensajeParam").text()};
		oRequest.Insert(params);
	}
	else
	{
		var email = $("#Email").val();
		MailerGmail.Params.Subject =  fromServer.People.Name + " desa compartir sus hobies con usted mediante Hobbyp.";
		MailerGmail.Params.Body =  "<h1>Hobbyp<h1> Realice y comparta sus hobbies organizadolos mediante Hobbyp, sus amigos le esperan. + <br>";
		MailerGmail.Params.Body += getLinkApp(email);
		MailerGmail.Params.AddressName = $("#Nombre").val();
		MailerGmail.Send(fnSendOk);
	}	
}

function getLinkApp(email)
{
	var linkApp = "http://hobbyp.bedagoni.hol.es/Join/Join.html";
	var linkStr = $("<a>").href(linkApp + "?" + email + "&from="+ fromServer.People.Id);	
}
//*****************************************************************************************************************************************************************
function send()
{
	MailerGmail.Params.AddressEmail = $("#Email").val();
	MailerGmail.Params.AddressName = $("#Nombre").val();
	MailerGmail.Send(fnSendOk);
}

function fnSendOk(data)
{
	alert("Mensaje enviado correctamente");
}

//******************************************************************************************************************************************************************************
function BuscarPeticionesAmistad()
{
	var params = {
		ObtenerSQL: ObtenerSQLMyRequests,
		fnOnLoad: fnOnLoadMyRequests,
		Titulo:  "OwnerName",
		Descripcion: "Description",
		Fecha: "FAlta",
		Clave: "IdOwner",
		Table: "oMessages"
	};

	$MyRequestsList = $("#MyRequestsList").Listado(params);
	$MyRequestsList.Consultar();
}

function ObtenerSQLMyRequests()
{
	var sql = " SELECT R.IdOwner, R.Description, P.Name as OwnerName, R.FAlta FROM oRequest R JOIN opeople P ON P.Id = R.IdOwner WHERE R.IdPeople = " + fromServer.People.Id;
	sql += " AND Estado = 0";		
	return sql;
}

function fnOnLoadMyRequests(data)
{
	if(data.NumRegistros > 0)
	{
		var linkR = '<a href="Requests.html">Tiene ' + data.NumRegistros + ' solicitudes de amistad</a>';	
		$("#lblMyRequests").html(linkR);
	}
}

//**************************************************************************************************************************************************
function BuscarFriends(){
		var paramsFriendsList = {
			ObtenerSQL: ObtenerSqlFriends,
			Titulo:  "FriendName",
			Descripcion: "Friend",
			//Fecha: "FAlta",
			Clave: "FriendId"
		};
	$FriendsList = $("#FriendsList").ListadoFriends(paramsFriendsList);
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
	//debugger;
	return sql;
}

//******************************************************************************************************************************************************************************
function btnBuscarNewTap()
{	
	cargarListaNew();
}

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
/*
function oRequestInsertNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	if(!hayError(httpRequest.responseText))
	{
		alert("Error al insertar\n" + textStatus + errorThrown.message + httpRequest.responseText);	
	}
}
*/
//***************************************************************************************************************************
function EnviarMensaje (To,ToName) {
  fromServer["To"] = To;
  fromServer["ToName"] = ToName;  
  hrefParams('NewMessage.html');
}
