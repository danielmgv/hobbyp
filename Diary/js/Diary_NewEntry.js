
$(document).bind('pageinit', function(){retrieveParams(); loadLang(); pageinit(); });

function pageinit(){			
	cargarHobbies();
	ajaxFormLoad();
}

//*****************************************************************************************************************************************************************************
function cargarHobbies()
{	
	var params = {
		ObtenerSQL: ObtenerSql,
		Titulo:  "Name",
		Clave: "Id"
	};
	var $lvHobbies = $("#lvHobbies").ListviewLoad(params);
	$lvHobbies.Consultar();		
}

function ObtenerSql()
{
	var sql = "SELECT Id, Name from ohoobyes  ";	
	return sql;
}
//********************************************************************************************************************************
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
//*************************************************************************************************************************************************************************
function btnSaveClick () {
    $.mobile.loading('show', {
        text: "",
        textVisible: false,
        theme: "a",
        textonly: false
    });
    
	oNews.Fields.IdPeople = fromServer.People.Id;
	oNews.Fields.IdHobbie = $("#lvHobbies").val();
	oNews.Fields.Title = $("#Title").val();
	oNews.Fields.Content = $("#Content").val();
	oNews.Fields.ImgFileName = $('#file').val().split('\\').pop();
	oNews.Fields.Privacity = $("input[name='Privacity']:checked").val();
	oNews.Insert();
}

function oNewsInsertOK(data)
{
	$.mobile.loading( 'hide' );
	if(!hayError(data))
	{
		var RutaDestino = encodeURIComponent("../Data/People_" + fromServer.People.Id + "/");
	    var NuevoNombre = "File_" + data[0].Id + ".dat";
	    oNews.KeyField.Id = data[0].Id;
	    var NombreOriginal = $('#file').val().split('\\').pop();
		$("#imageForm").attr("action", "../Ajax/include/upload.php?RutaDestino="+RutaDestino+"&NuevoNombre="+NuevoNombre+"&NombreOriginal="+ NombreOriginal);		
		$("#imageForm").submit();
	}
}

function oNewsInsertNOK(httpRequest, textStatus, errorThrown) {
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

