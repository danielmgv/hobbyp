
function pageinit(){	
	var params = {
		Table:"Countries",
		Text:"CountryName",
		Value:"CountryISO_A2"
		//,		Selected: opeople.Fields.Country
	};
	
	$("#Country").Cargar(params);
	
	opeople.KeyField.Id = fromServer.People.Id;	
	opeople.GetByKey();	
	
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

//***************************************************************************************************************************************************************************************
function opeopleGetByKeyOK(data)
{
	$.each(data[0], function(campo, valor) {
	    opeople.Fields[campo] = valor;
	});	
	
	fromServer.People.Photo = opeople.Fields.Photo;//Nombre original
	
	$("#Name").val(opeople.Fields.Name);
	$("#Email").val(opeople.Fields.Email);	
	//$("#Password").val(opeople.Fields.Password);
	$("#ObservacionesHobbies").val(opeople.Fields.ObservacionesHobbies);
	
	//opeople.Fields.Photo = $('#file').val().split('\\').pop();
	
	//$("#Country").val(opeople.Fields.Country);
	selectMobile($("#Country"), opeople.Fields.Country);
	
	$("#City").val(opeople.Fields.City);
	$("#Gender_" + opeople.Fields.Gender).click();//attr('checked', 'checked');
	//$('input:radio[name="Gender"]').filter('[value="'+ opeople.Fields.Gender +'"]').next().click();
	
	//$("input[type='radio']").attr("checked",true).checkboxradio("refresh");
	//$("#Gender").val(opeople.Fields.Gender);
	$("#Age").val(opeople.Fields.Age);
	$("#Phone").val(opeople.Fields.Phone);
	recargarFotos();		
}

function selectMobile(el, value)
{
	// Select the relevant option, de-select any others
	el.val(value).attr('selected', true).siblings('option').removeAttr('selected');
	
	// jQM refresh
	el.selectmenu("refresh", true);
}

function recargarFotos()
{
	$(".MyPhotoClass").each(
		function() {
		  imageFromServer($(this), "../Data/People_" + fromServer.People.Id + "/PersonalFile_" + fromServer.People.Id + ".dat" , opeople.Fields.Photo );
		}
	);	
}
	
//************************************************************************************************************************************
function btnSaveClick () {
    $.mobile.loading('show', {
        text: "",
        textVisible: false,
        theme: "a",
        textonly: false
    });

	opeople.KeyField.Id = fromServer.People.Id;
	opeople.Fields.Name = $("#Name").val();
	opeople.Fields.Email = $("#Email").val();
	//opeople.Fields.Password = $("#Password").val();
	opeople.Fields.ObservacionesHobbies = $("#ObservacionesHobbies").val();
	opeople.Fields.Photo = $('#file').val().split('\\').pop();
	opeople.Fields.Country = $("#Country").val();
	opeople.Fields.City = $("#City").val();
	opeople.Fields.Gender = $("input[name='Gender']:checked").val();
	opeople.Fields.Age = $("#Age").val();
	opeople.Fields.Phone = $("#Phone").val();	
	
	opeople.Procedure("opeopleUpdate", $.extend({}, opeople.KeyField, opeople.Fields));
}

function opeopleUpdateOK(data)
{
	$.mobile.loading( 'hide' );
	if(!hayError(data))
	{
		var pathTo = encodeURIComponent("../Data/People_" + fromServer.People.Id + "/");
	    var newFileName = "PersonalFile_" + fromServer.People.Id + ".dat";
	    var fileName = $('#file').val().split('\\').pop();
	    if(fileName.length > 0)
	        uploadFile(fileName, newFileName, pathTo);
	}
}

function uploadFile(fileName, newFileName, pathTo)
{
	$("#imageForm").attr("action", "../Ajax/include/upload.php?RutaDestino="+pathTo+"&NuevoNombre="+newFileName+"&NombreOriginal="+ fileName);		
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








