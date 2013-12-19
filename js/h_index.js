
$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	AjaxService = 'Ajax/AjaxService.php';
	$('.txtSearch').textinput();
	
	//styles = { 'height': '50px', 'font-size': '48px' };
  
	//$("#btnEnviar").css(styles);
	// Bind the tapHandler callback function to the tap event on div.box
    //$("#btnEnviar").on( 'tap', tapHandler );
	
	
	$('input[type="search"]').on('change', searchHandler);
	
}
	
// Callback function references the event target and adds the 'tap' class to it
function searchHandler( event ) {
	//$(event.target).addClass( "tap" );
	Consultar();
}
//***********************************************************************************************************************************************************

function Consultar()
{
	var sql = ObtenerSql();	
	$.mobile.loading( 'show', {
			text: "",
			textVisible: false,
			theme: "a",
			textonly: false
			//,			html: html
	});
    AsyncConsultaSELECT({ SQL: sql }, ConsultarOK, ConsultarNOK);
}

//******************************************************************************************************************************************************************************
function ConsultarOK(data)
{
	var titulo = '<li data-role="list-divider">Hobbyps list</li>';
	var items = [];

	for (var i = 0; i < data.NumRegistros; i++) {
		items.push(getListItem(data[i]));		
	}
				   
	$('#lstSearch').html(titulo + items.join(''));

	$('#lstSearch').trigger('create');    
	$('#lstSearch').listview('refresh');
	
	obtenerTextos();
	
	$.mobile.loading( 'hide' );	
}

function ConsultarNOK(httpRequest, textStatus, errorThrown) {       
	$.mobile.loading( 'hide' ); 
	alert("Error al obtener registros.\n" + httpRequest.responseText);        
}

//******************************************************************************************************************************************************************************
//BASE DE DATOS

function getClaves(texto)
{
	return texto.split(" ");
}

function ObtenerSql() {
	var palabrasClaveReg = getClaves($("#txtSearch").val());
	
	var sql = "SELECT  P.Id, P.Name, P.PathDescription  FROM OPEOPLE P LEFT JOIN OP_HOBBYES PH ON PH.IdPeoble =   P.Id ";
	sql += " JOIN ohobbyes H ON H.Id = PH.IdHobbie AND Name eriodo = '" + obtenerPeriodoCurso() + "'";
	
			
	if(palabrasClaveReg != undefined)
	{
		sql += " AND H.Name REGEXP '" + palabrasClaveReg + "'";       	
	}
	
	return sql;
}
//****************************************************************************************************************************************************************************
function getListItem(row)
{
	var params = { Curso:$("#Curso").val(), Clase:$("#Clase").val(), nombre:$("#nombre").val(), apellidos:$("#apellidos").val() };
	var str = jQuery.param(params);
	var url = 'people_photos.php?IdPeople=' + row.Id + '&Name=' + row.Name;	
	var aux = '<li ><a href="' + url + '" rel="external" >';
	aux +=	getImg(row);
	aux +=	'<h3>' + row.Name + '</h3>';
	aux +=	'<label class="PathDescription" PathDescription="' + PathDescription + '"><(label>';
	aux +=	'</a></li>';
	return aux;
}

//****************************************************************************************************************************************************************************
function getImg(row)
{
	var urlfoto = "";
	var ruta;
	if(row.IdFoto != null)
	{
		ruta = encodeURIComponent(row.Ruta + row.Id + "_" + row.IdFoto + ".dat");
		urlfoto = "../include/Image.php?NombreOriginal=" + row.NombreOriginal + "&Ruta=" + ruta;
	}

	return '<img height="80" class="ui-li-thumb"  src="' + urlfoto + '">';
}

function obtenerTextos()
{
	    $("label.PathDescription").each(
        function() {
            if ($(this).val() != "") {
                setFileTxt($(this));
            }
        }
    );
}

function setFileTxt(jqLbl)
{
	params["Ruta"] = jqLbl.attr("PathDescription");	
	
	jqxhr =$.ajax({
			type: 'POST', 
			url: 'Ajax/GetFileTxt.php',
			data: params,
			success: function(data, textStatus, jqXHR)
			{
				jqLbl.val(data);
			},
			error: function(httpRequest, textStatus, errorThrown)
			{				
				setFileTxtNOK(httpRequest, textStatus, errorThrown);
			},
			dataType: "text",
			async:false
		});	
}

function setFileTxtNOK(httpRequest, textStatus, errorThrown)
{
	$.mobile.loading( 'hide' );
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		alert("Error al obtener el texto.<br/>" + data.Error);
	}
	catch(any)
	{
		alert("Error al obtener el texto.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}
				
//***************************************************************************************************************************************************************************
//LOGIN	
function login()
{
	var email = $("#email").val();
	var password = $("#password").val();
		
	var paramsProcedure =
	[			
		"'" + email + "'",
		"'" + password + "'"
	];
	//alert(paramsProcedure);
	var params = {paramsProcedure : paramsProcedure};
	
	params.Procedure = 'Login';
	params.fnCall = AsyncCallProcedureScalar;
	params.fnOK = LoginOK;
	params.fnNOK = LoginNOK;	

	//$.mobile.showPageLoadingMsg();
	
	$.mobile.loading( 'show', {
			text: "",
			textVisible: false,
			theme: "a",
			textonly: false
			//,			html: html
	});
			
	CallMySQL(params);
}

function LoginOK(data) {
	//$.mobile.hidePageLoadingMsg();
	$.mobile.loading( 'hide' );
	if(!hayError(data))
	{
		if(data[0])
		{
			location.href="/Alumnos_Mobile/alumnos_consulta.php";
		}
		else
		{
			alert("No se encuentra el usuario");
		}
	}
}

function LoginNOK(httpRequest, textStatus, errorThrown) {
	//$.mobile.hidePageLoadingMsg();
	$.mobile.loading( 'hide' );
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		alert("Error al realizar el login.<br/>" + data.Error);
	}
	catch(any)
	{
		alert("Error al realizar el login.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}
//**************************************************************************************************************************************************************************************
		
