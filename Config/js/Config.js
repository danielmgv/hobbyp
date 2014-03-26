
function pageinit(){	
	loadPeopleData();
	ajaxFormLoad();
	var params = {
		Table:"Countries",
		Text:"CountryName",
		Value:"CountryISO_A2"
	};

	$("#Countries").Cargar(params);
}

function loadPeopleData()
{
	opeople.Fields = fromServer.People;
	
	$("#Name").val(opeople.Fields.Name);
	$("#Email").val(opeople.Fields.Email);	
	$("#Password").val(opeople.Fields.Password);
	$("#ObservacionesHobbies").val(opeople.Fields.ObservacionesHobbies);
	
	//opeople.Fields.Photo = $('#file').val().split('\\').pop();
	$("#Country").val(opeople.Fields.Country);
	$("#City").val(opeople.Fields.City);
	$("#Gender").val(opeople.Fields.Gender);
	$("#Age").val(opeople.Fields.Age);
	$("#Phone").val(opeople.Fields.Phone);
	recargarFotos();
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
/*
function SuccessAjaxForm () {
	//showError("Imagen subida.");
	$("#formNew").hide();
	$("#btnAdd").show();
	$lvMeNews.Consultar();
}
*/
function CompleteAjaxForm (httpRequest) {
	var errorJson = JSON.parse(httpRequest.responseText);
	if(!hayError(errorJson))
	{
		opeople.GetByKey();

	}
}

function opeopleGetByKeyOK(data)
{
	alert("Revisar esto");
	opeople = data;
	loadPeopleData();
}

function recargarFotos()
{
	$(".MyPhotoClass").each(
		function() {
		  imageFromServer($(this), "../Data/People_" + fromServer.People.Id + "/" + opeople.Fields.Photo, "foto" );
		}
	);	
}

function imageFromServer($image, rutaServer, nombreOriginal)
{
	var ruta = encodeURIComponent(rutaServer);				
	var urlfoto = "../Ajax/include/Image.php?NombreOriginal=" + nombreOriginal + "&Ruta=" + ruta;
	$image.attr("src", urlfoto);	
}
	
//************************************************************************************************************************************
function btnSaveClick () {
    $.mobile.loading('show', {
        text: "",
        textVisible: false,
        theme: "a",
        textonly: false
    });
    
	opeople.KeyFields.Id = fromServer.People.Id;
	opeople.Fields.Name = $("#Name").val();
	opeople.Fields.Email = $("#Email").val();
	opeople.Fields.Password = $("#Password").val();
	opeople.Fields.ObservacionesHobbies = $("#ObservacionesHobbies").val();
	opeople.Fields.Photo = $('#file').val().split('\\').pop();
	opeople.Fields.Country = $("#Country").val();
	opeople.Fields.City = $("#City").val();
	opeople.Fields.Gender = $("#Gender").val();
	opeople.Fields.Age = $("#Age").val();
	opeople.Fields.Phone = $("#Phone").val();	
	
	opeople.Procedure("opeopleUpdate", $.extend({}, opeople.KeyFields, opeople.Fields));
}

function opeopleUpdateOK(data)
{
	$.mobile.loading( 'hide' );
	if(!hayError(data))
	{
		var pathTo = encodeURIComponent("../Data/People_" + opeople.Id + "/");
	    var newFileName = "PersonalFile_" + data[0].Id + ".dat";
	    //opeople.KeyField.Id = data[0].Id;
	    var fileName = $('#file').val().split('\\').pop();
	    uploadFile(fileName, newFileName, pathTo);
	}
}

function uploadFile(fileName, newFileName, pathTo)
{
	$("#imageForm").attr("action", "../Ajax/include/upload.php?RutaDestino="+RutaDestino+"&NuevoNombre="+NuevoNombre+"&NombreOriginal="+ NombreOriginal);		
	$("#imageForm").submit();
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








