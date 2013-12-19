

var Insert = "HDocumentoInsert";
var CONS_RUTA = "../Data/";

$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	AjaxService = '../Ajax/AjaxService.php';	
	
	if(fromServer.DocumentoGuardado != "")
	{
		documentoGuardado();
	}
	
	if(fromServer.Respuesta != "")
	{
		alert(fromServer.Respuesta);
	}

	cargarLista();
}
var sql;
function cargarLista()
{
	sql = "SELECT Id, Path, NombreOriginal, Titulo FROM op_photo WHERE IdPeople = " + fromServer.People.Id;
	
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

var lstPhotos = $("#lstPhotos");
function dataToListado(data)
{
	lstPhotos = $("#lstPhotos");
	
	if (data.NumRegistros == 0) {
		var li = $('<li>');		
		li.text("No se encontraron registros.");
		lstPhotos.append(li);
	}
	else {				
		for (var i = 0; i < data.NumRegistros; i++) {			
			addRow(data[i]);			
		}
	}	
	
	lstPhotos.listview('refresh');	
}

function addRow(row)
{
	var ruta = encodeURIComponent(row.Path);//;(row.Ruta + row.Id + "_" + row.IdFoto + ".dat");		
	var urlfoto = "../include/Image.php?NombreOriginal=" + row.NombreOriginal + "&Ruta=" + ruta;
	var htmlImg = '<li>';
	htmlImg += '<a href="index.html">';
	htmlImg += '<img src="' + urlfoto + '" />';	
	htmlImg += '<h3>Warning</h3>';
	htmlImg += '<p>Hot Chip</p></a></li>';

	lstPhotos.append(htmlImg);
}

function imageServer(row)
{
	var ruta = encodeURIComponent(row.Path);//;(row.Ruta + row.Id + "_" + row.IdFoto + ".dat");		
	var urlfoto = "../include/Image.php?NombreOriginal=" + row.NombreOriginal + "&Ruta=" + ruta;
	return $('<img height="50"  src="' + urlfoto + '">');
}


function cargarListaNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	alert("Error al cargar lista.\n" + sql + " " + textStatus + errorThrown.message);	
}

function fileInputs() {
  var $this = $(this),
	  $val = $this.val(),
	  valArray = $val.split('\\'),
	  newVal = valArray[valArray.length-1],
	  $button = $this.siblings('.button'),
	  $fakeFile = $this.siblings('.file-holder');
  if(newVal !== '') {
	$button.text('Photo Chosen');
	if($fakeFile.length === 0) {
	  $button.after('' + newVal + '');
	} else {
	  $fakeFile.text(newVal);
	}
  }
};
 /*
			$(document).ready(function() {
			  $('.file-wrapper input[type=file]')
			  .bind('change focus click', VIGET.fileInputs);
			});
*/
//*************************************************************************************************************************************************************************

//Guardar foto
function guardarFotoTap()
{
	$("#file").show();
}
//Guardar foto
function guardarFotoTap2()
{
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
		//,			html: html
	});
	
	var params = {
			Ruta: CONS_RUTA + fromServer.People.Id+ "/",
			NombreOriginal: $('#file').val().split('\\').pop(),
			PeopleId:fromServer.People.Id,
			fnOK: guardarFotoOK,
			fnNOK: guardarFotoNOK
	};
		
	AL_DocumentoInsert(params);
}

function documentoGuardado()
{
	$.mobile.loading( 'hide' );	
	alert("Documento guardado en fichero");	
}

function guardarFotoOK(data) {	
	$.mobile.loading( 'hide' );		
	if(!hayError(data))
	{		
		submitFile(data["0"]);	
	}
}

function guardarFotoNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	alert("Error al guardar la foto.\n" + textStatus + errorThrown.message);	
}


function submitFile(ALDocumento)
{
	$("#IdPeople").val(ALDocumento.IdPeople);
	$("#Ruta").val(CONS_RUTA + fromServer.People.Id+ "/");
	$("#NuevoNombre").val(ALDocumento.Id + "_" + fromServer.People.Id + ".dat");
		
	$("#formSubirFoto").submit();
}

//***************************************************************************************************************************************************************************

function AL_DocumentoInsert(params)
{
	var sqlProcedure = Insert + '("' + params.Ruta + '", ' + params.PeopleId + ', "' + params.NombreOriginal + '")';
	AsyncCallProcedureScalar(sqlProcedure, params.fnOK, params.fnNOK);	
}

//********************************************************************************************************************************************************************************




		
