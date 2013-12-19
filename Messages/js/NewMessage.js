
$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	AjaxService = '../Ajax/AjaxService.php';			
	$("#btnEnviar").live( 'tap', tapEnviar );			
}

function tapEnviar( event ) {
	$(event.target).addClass( "tap" );
	sendMessage();
}
//*************************************************************************************************************************************************************************

function sendMessage()
{
	debugger;
	$.mobile.loading( 'show', {
		text: "",
		textVisible: false,
		theme: "a",
		textonly: false
		//,			html: html
	});
	var params={
		 IdOrigenParam: null
	    ,FechaParam: new Date()
		,MensajeParam: $("#MensajeParam")
		,DeParam: fromServer.People.Id
		,ParaParam: $("#ParaParam")		
	};
	
	AsyncCallProcedureScalar(getSqlProcedure("oMessagesInsert", params), sendMessageOK, sendMessageNOK);
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
//********************************************************************************************************************

function getSqlProcedure(procedure, params)
{
	var parametrosStr = serializeJson(params);
	return procedure + "(" + ")";	
}

function serializeJson(jsonVar)
{
	var serializeArr = [];
	for (var key in jsonVar) {
	  if (jsonVar.hasOwnProperty(key)) {
		  switch (typeof jsonVar[key]) {
		    case 'string':
		  		serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;
			case 'number':
		  		serializeArr.push(jsonVar[key]);
		  		break;
			case 'object':
				//function(jsonVar[key])
		  		//serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;
			case 'boolean':
		  		serializeArr.push( jsonVar[key]);
		  		break;
			case null:
		  		//serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;
			case 'undefined':
		  		//serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;	  			
			default:
		  		//serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;
			  }
	  }	  
	 }
	 return serializeArr.join(",");
}

//***********************************************************************************************************************************



		
