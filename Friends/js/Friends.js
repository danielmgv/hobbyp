
var $listview;

$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	$listview = $("#listviewId");
	AjaxService = '../Ajax/AjaxService.php';		
	
	$("#newMessage").on( 'tap', tapnewMessage );	
	
	
	var params = {
		ObtenerSQL:ObtenerSQL,
		Text:  "Name",
		Value: "Id",
		Table: "oMessages"
		};
	//Todos los enviados
	debugger;
	$listview = $("#ListId").ListadoMensajes(params);
	$listview.Consultar();
}

function listViewClick(value)
{
	cargarLista(value, $("#description").val());
}

// Callback function references the event target and adds the 'tap' class to it
function tapnewMessage( event ) {
	$(event.target).addClass( "tap" );
	cargarLista("", $("#description").val());
}

function ObtenerSQL()
{
	sql = "SELECT P.Name as PName, P.Id, H.Name as HName  FROM opeople P JOIN op_hobbyes PH ON PH.IdPeople = P.Id  ";
	sql += " LEFT JOIN ohoobyes H ON H.Id = PH.Idhobbye ";
	
	return sql;
}

//*************************************************************************************************************************************************************************

function sendMessage()
{
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
			fnOK: sendMessageOK,
			fnNOK: sendMessageNOK
	};
	op_hobbyesSendMenssage(params);
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



		
