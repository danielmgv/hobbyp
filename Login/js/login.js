
$(document).bind('pageinit', function(){retrieveParams();	pageinit();	});

function pageinit(){
	if(fromServer.Id)
	{		
		//hrefParams("../Friends/Friends.html");	
	}
	AjaxService = '../Ajax/AjaxService.php';
	// Bind the tapHandler callback function to the tap event on div.box
    $("#btnLogin").on( 'tap', tapLogin );	
}
			
//***************************************************************************************************************************************************************************
//REGISTER	

// Callback function references the event target and adds the 'tap' class to it
function tapLogin( event ) {
	$(event.target).addClass( "tap" );
	login();
}

function login()
{
	var email = $("#email").val();
	var password = $("#password").val();
	
	var params = {};
	
	params.SQL = "SELECT Id, Name FROM opeople WHERE Email='" + email + "' AND Password='" + password + "'";
	//params.fnCall = AsyncConsultaSELECT;
	//params.fnOK = HLoginOK;
	//params.fnNOK = HLoginNOK;	
	
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
		//,			html: html
	});
	
	AsyncConsultaSELECT(params, loginOK, loginNOK);
	//CallMySQL(params);
}

function loginOK(data) {		
	$.mobile.loading( 'hide' );	
	
	if(!hayError(data))
	{
		if(data.NumRegistros > 0)
		{
			fromServer.People = {Id: data[0].Id};
			logado(data[0].Id, data[0].Name);
		}
		else
		{
			alert("No se encuentra el usuario");
		}
	}
}

function loginNOK(httpRequest, textStatus, errorThrown) {
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

function logado(IdPeople, Name)
{
	fromServer = {
			People : {
				Id: IdPeople,
				Name: Name
				}
		};	
	hrefParams("../Friends/Friends.html");
	
	//window.location.href="../Friends/Friends.php?Id=" + IdPeople + "&Name=" + Name;
	//$.mobile.changePage("../H_Me/MyPhotos.php?Id=" + IdPeople + "&Name=" + Name);
}

//**************************************************************************************************************************************************************************************

