
$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	AjaxService = '../Ajax/AjaxService.php';
	// Bind the tapHandler callback function to the tap event on div.box
    $("#btnRegister").on( 'tap', tapRegister );	
}
			
//***************************************************************************************************************************************************************************
//REGISTER	

// Callback function references the event target and adds the 'tap' class to it
function tapRegister( event ) {
	$(event.target).addClass( "tap" );
	register();
}

function register()
{
	var name = $("#name").val();
	var email = $("#email").val();
	var password = $("#password").val();
		
	var paramsProcedure =
	[			
		"'" + name + "'",
		"'" + email + "'",
		"'" + password + "'"
	];
	//alert(paramsProcedure);
	var params = {paramsProcedure : paramsProcedure};
	
	params.Procedure = 'HRegister';
	params.fnCall = AsyncCallProcedureScalar;
	params.fnOK = HRegisterOK;
	params.fnNOK = HRegisterNOK;	
	
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
		//,			html: html
	});
	
	CallMySQL(params);
}

function HRegisterOK(data) {	
	$.mobile.loading( 'hide' );	
	if(!hayError(data))
	{
		if(data[0])
		{
			fromServer.People = {Id: data[0].Id};
			registrado(data[0].Id, data[0].Name);
		}
		else
		{
			alert("No se pudo registrar el usuario");
		}
	}
}

function HRegisterNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		alert("Error al realizar el registro.<br/>" + data.Error);
	}
	catch(any)
	{
		alert("Error al realizar el registro.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}

function registrado(IdPeople, Name)
{
	window.location.href="../H_Me/MyPhotos.php?Id=" + IdPeople + "&Name=" + Name;
	//$.mobile.changePage("../H_Me/MyPhotos.php?Id=" + IdPeople + "&Name=" + Name);
}

//**************************************************************************************************************************************************************************************

