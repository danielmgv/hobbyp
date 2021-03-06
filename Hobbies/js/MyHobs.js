

var storedQuery = {};
var $listview;
var sql;
var seleccionado;

$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	$listview = $("#listviewId");
	AjaxService = '../Ajax/AjaxService.php';		
	
	$("#addHob").on( 'tap', tapadd );	
	
	//Hobies del usuario
	cargarLista();
	
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
	guardar(value);
}

// Callback function references the event target and adds the 'tap' class to it
function tapadd( event ) {
	$(event.target).addClass( "tap" );
	guardar();
}

function cargarLista()
{
	sql = "SELECT H.Name, H.Id  FROM op_hobbyes P JOIN ohoobyes H ON H.Id = P.IdHobbye WHERE P.IdPeople = " + fromServer.People.Id;
	
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

function deleteHobbye()
{
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
		//,			html: html
	});
	
	var params = {
			IdHobbie: seleccionado,
			IdPeople:fromServer.People.Id,
			Like: true,
			fnOK: deleteOK,
			fnNOK: deleteNOK
	};
	op_hobbyesDelete(params);
}


function deleteOK(data) {
	$.mobile.loading( 'hide' );
	$("#btnCancel").click();
	cargarLista();		
	if(!hayError(data))
	{
		//alert("Borrado");	
	}
}

function deleteNOK(httpRequest, textStatus, errorThrown) {
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
		alert("Error al borrar.\n" + textStatus + errorThrown.message);	
	}
}
//**************************************************************************************************



		
