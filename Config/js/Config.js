
function pageinit(){	
	ajaxFormLoad();
}

function ajaxFormLoad () {	
    var options = {
        beforeSend: function() {
        },
        uploadProgress: function(event, position, total, percentComplete) {
        },
        //success: SuccessAjaxForm,
        complete: CompleteAjaxForm,
        error: function(httpRequest, obj1, obj2) {
        	try{        	
        		var errorJson = JSON.parse(httpRequest.responseText);
				if(!hayError(errorJson))
				{
			    	showError("<font color='red'>" + lang.ErrorUpload.Text + " " + httpRequest.responseText + "</font>");
				}
			}catch(any){
				showError("<font color='red'>" + lang.ErrorUpload.Text+ " " + httpRequest.responseText + "</font>");
			}
        }
    };

    $("#imageForm").ajaxForm(options);
}

function SuccessAjaxForm () {
	//showError("Imagen subida.");
	$("#formNew").hide();
	$("#btnAdd").show();
	$lvMeNews.Consultar();
}

function CompleteAjaxForm (httpRequest) {
	var errorJson = JSON.parse(httpRequest.responseText);
	if(!hayError(errorJson))
	{
		window.history.back();
	}
	else
	{		
		oNews.Delete();	
	}
}
//************************************************************************************************************************************
function btnSaveClick () {
    $.mobile.loading('show', {
        text: "",
        textVisible: false,
        theme: "a",
        textonly: false
    });
    
	opeople.Fields.IdPeople = fromServer.People.Id;
	opeople.Fields.IdHobbie = $("#lvHobbies").val();
	opeople.Fields.Title = $("#Title").val();
	opeople.Fields.Content = $("#Content").val();
	opeople.Fields.ImgFileName = $('#file').val().split('\\').pop();
	opeople.Fields.Privacity = $("input[name='Privacity']:checked").val();
	opeople.Insert();
}

function opeopleInsertOK(data)
{
	$.mobile.loading( 'hide' );
	if(!hayError(data))
	{
		var RutaDestino = encodeURIComponent("../Data/People_" + opeople.Id + "/");
	    var NuevoNombre = "PersonalFile_" + data[0].Id + ".dat";
	    opeople.KeyField.Id = data[0].Id;
	    var NombreOriginal = $('#file').val().split('\\').pop();
		$("#imageForm").attr("action", "../Ajax/include/upload.php?RutaDestino="+RutaDestino+"&NuevoNombre="+NuevoNombre+"&NombreOriginal="+ NombreOriginal);		
		$("#imageForm").submit();
	}
}
/*
function opeopleInsertNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );
	if(httpRequest.status = 500)
	{
		try{
			var errorJson = eval(httpRequest.responseText);
			showError(errorJson.Error);
		}
		catch(any){
			showError(httpRequest.responseText);		
		}	
	}
	else
	{		
		showError("Error al actualizar.\n" + textStatus + errorThrown.message);	
	}
}
*/





