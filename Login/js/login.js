
$(document).bind('pageinit', function(){loadLang();	pageinit();	});

function pageinit(){
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
	params.SQL = "SELECT Id, Name, ObservacionesHobbies FROM opeople WHERE Email='" + email + "' AND Password='" + password + "'";	
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
	});
	AsyncConsultaSELECT(params, loginOK, loginNOK);
}

function loginOK(data) {		
	$.mobile.loading( 'hide' );	
	try{
		if(!hayError(data))
		{
			if(data.NumRegistros > 0)
			{		
				logado(data[0]);
			}
			else
			{
				showError("No se encuentra el usuario");
			}
		}
		else
		{
			showError("error" + data.Error);		
		}
	}
	catch(err){		
		showError("loginOK: Error " + err.message);
	}
}

function loginNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );	

	if(!hayError(httpRequest.responseText))
	{
		var errorTxt = "Error \n" + textStatus + errorThrown.message + httpRequest.responseText;
		errorTxt += "\n" + errorThrown + httpRequest.statusText;
		showError(errorTxt);	
	}	
}

function logado(data)
{
	fromServer = {
			People : {
				Id: data.Id,
				Name: data.Name,
				ObservacionesHobbies: data.ObservacionesHobbies
				}
		};
	hrefParams("../News/News.html");
	
	//window.location.href="../Friends/Friends.php?Id=" + IdPeople + "&Name=" + Name;
	//$.mobile.changePage("../H_Me/MyPhotos.php?Id=" + IdPeople + "&Name=" + Name);
}

//**************************************************************************************************************************************************************************************

