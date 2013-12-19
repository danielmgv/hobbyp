
$(document).ready(function() {
	documentReady();
});

function documentReady(){
	AjaxService = 'Ajax/AjaxService.php';
	createLogin();
}
	
//***************************************************************************************************************************************************************************
//LOGIN	
function createLogin() {
    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
	
	$(document).keypress(function(e) {
	if (e.which == 13) {
			$("#btnLogin").click();
		}
	});
}

function login()
{
	var email = $("#email").val();
	var password = $("#password").val();
		
	var paramsProcedure =
	[			
		"'" + email + "'",
		"'" + password + "'"
	];

	var params = {paramsProcedure : paramsProcedure};
	
	params.Procedure = 'Login';
	params.fnCall = AsyncCallProcedureScalar;
	params.fnOK = LoginOK;
	params.fnNOK = LoginNOK;	

	ccb.feedBack.loading();	
	CallMySQL(params);
}

function LoginOK(data) {	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		if(data[0])
		{
			parent.login($("#email").val());
			location.href="WellCome.php";
		}
		else
		{
			$alert("No se encuentra el usuario");
		}
	}
}

function LoginNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		$error("Error al realizar el login.<br/>" + data.Error);
	}
	catch(any)
	{
		$error("Error al realizar el login.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}
//**************************************************************************************************************************************************************************************
		
