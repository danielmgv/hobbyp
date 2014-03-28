

var storedQuery = {};
var $listview;
var sql;
var seleccionado;

function pageinitOld(){
	$listview = $("#listviewId");
	AjaxService = '../Ajax/AjaxService.php';		
	
	$("#addHob").on( 'tap', tapadd );	
	
	
	var params = {
		Text:  "Name",
		Value: "Id",
		Table: "ohoobyes"
		};
	//Todos los hobbies
	$("#listHobbies").LoadMySQL(params);
	//$('input[data-type="search"]').val("");
	//$('input[data-type="search"]').trigger("change");
	var filter_el = $(".ui-input-text");
	var filter_val = filter_el.val();
	var filter_query = filter_val+$(this).text();
	filter_el.val(filter_query);
	filter_el.trigger("change");
}

function listViewClick(value)
{
	cargarLista(value, $("#description").val());
}


// Callback function references the event target and adds the 'tap' class to it
function tapadd( event ) {
	$(event.target).addClass( "tap" );
	cargarLista("", $("#description").val());
}


function cargarLista(idhobbye, description)
{
	sql = "SELECT P.Name as PName, P.Id, H.Name as HName  FROM opeople P JOIN op_hobbyes PH ON PH.IdPeople = P.Id  ";
	sql += " LEFT JOIN ohoobyes H ON H.Id = PH.Idhobbye ";
	
	if(idhobbye!="")
	{
		sql += " WHERE PH.Idhobbye = " + idhobbye;
	}
	
	if(description!="")
	{								    
		sql += " WHERE H.Name LIKE '%"+ description +"%'";
	}
	
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
	var linkMensaje = '<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Mensaje</a>';
	var htmlImg = '<li class="ht" onclick="seleccionar(' + row.Id + ');" ><a href="#" ><h3>' + row.PName +'</h3><p>' + row.HName +'</p></a>' + linkMensaje + '</li>';
	
	$listview.append(htmlImg);
}


function seleccionar(IdHobbie)
{
	seleccionado = IdHobbie;	
}


function cargarListaNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	alert("Error al cargar lista.\n" + sql + " " + textStatus + errorThrown.message + httpRequest.responseText);	
}

//*************************************************************************************************************************************************************************

//Guardar 
function guardar(value)
{
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
		//,			html: html
	});
	
	var params = {
			IdHobbie: value,
			IdPeople:fromServer.People.Id,
			Like: true,
			fnOK: guardarOK,
			fnNOK: guardarNOK
	};
	op_hobbyesInsert(params);
}


function guardarOK(data) {	
	$.mobile.loading( 'hide' );
	cargarLista();		
	if(!hayError(data))
	{
		$('input[data-type="search"]').val("");
		$('input[data-type="search"]').trigger("keyup");
		alert("Guardado");	
	}
}

function guardarNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );
	cargarLista();
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
		alert("Error al guardar.\n" + textStatus + errorThrown.message);	
	}
}
//**********************************************************************************************************************************************

var SendMenssage = "op_hobbyesSendMenssage";

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
	
	var params = {
			IdReciber:seleccionado,
			IdSender: fromServer.People.Id,
			Message: $("#Message").val(),
	};
		
	AsyncCallProcedureScalar(getSqlProcedure("op_hobbyesSendMenssage", params), sendMessageOK, sendMessageNOK);
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



		
