
$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){

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
	try{
		if(!hayError(data))
		{
			if(data.NumRegistros > 0)
			{		
				logado(data[0].Id, data[0].Name);
			}
			else
			{
				alert("No se encuentra el usuario");
			}
		}
		else
		{
			alert("error" + data.Error);		
		}
	}
	catch(err){		
		alert("loginOK: Error " + err.message);
	}

	
}

function loginNOK(httpRequest, textStatus, errorThrown) {
	alert(2);
	$.mobile.loading( 'hide' );	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		alert("Error al realizar el registro.<br/>" + data.Error);
	}
	catch(any)
	{
		alert("Error al realizar el registro.<br/>" + any.message + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
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

