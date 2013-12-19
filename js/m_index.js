
$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	AjaxService = 'Ajax/AjaxService.php';

	// Bind the tapHandler callback function to the tap event on div.box
    $("#btnEnviar").on( 'tap', tapHandler );
	
}
	
 
// Callback function references the event target and adds the 'tap' class to it
function tapHandler( event ) {
		$(event.target).addClass( "tap" );
		login();
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

	ccb.feedBack.loading();	
	CallMySQL(params);
}

function LoginOK(data) {	
	//ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		if(data[0])
		{
			//parent.login(data[0]);
			//alert("/Alumnos_Mobile/alumnos_consulta.php");
			location.href="/Alumnos_Mobile/alumnos_consulta.php";
		}
		else
		{
			alert("No se encuentra el usuario");
		}
	}
}

function LoginNOK(httpRequest, textStatus, errorThrown) {
	//alert(1);
	//ccb.feedBack.endLoading();	
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
		
