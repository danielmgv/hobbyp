
//$(document).bind('pageinit', function(){retrieveParams(); loadLang(); pageinit(); });

function pageinit(){	
	var params = {
		Clave: "Id",
		ObtenerSQL:ObtenerSQLMeNews,
		Text:  "Name",
		Value: "Id",
		Table: "oMessages"
		};

	//Todos los Noticias mias
	$lvMeNews = $("#lvMeNews").ListadoNews(params);
	$lvMeNews.Consultar();	
}

function ObtenerSQLMeNews()
{
	var sql =  " SELECT oNews.Id, IdPeople, IdHobbie, Title, Content, ImgFileName, FAlta, H.Name as HobbieName ";
	sql += " FROM oNews  ";
	sql += " JOIN ohoobyes H ON H.Id = IdHobbie ";	
	sql += " WHERE IdPeople = " + fromServer.People.Id;
	return sql;
}

//*********************************************************************************************************************************************************
function btnAddClick () {
	//fromServer["To"] = To;
	//fromServer["ToName"] = ToName;  
	hrefParams('Diary_NewEntry.html');
}
//***************************************************************************************************************************
function oNewsDelete(Id)
{		
	if(confirm(lang.ConfirmONewsDelete.Text))
	{
		$.mobile.loading( 'show', {
			text: "",
			textVisible: false,
			theme: "a",
			textonly: false
		});
		
		var PATH = "Data/People_" + fromServer.People.Id + "/File_" + Id + ".dat";	
		var params = {PATH: PATH, Id: Id}; 
		var serverFile = new ServerFile(params);
		serverFile.Delete();	
	}
}

function  SeverFileDeleteOK (params) {
	oNews.KeyField.Id = params.Id;	
	oNews.Delete();
}

function oNewsDeleteOK(data) {
	$.mobile.loading( 'hide' );

	if(!hayError(data))
	{
		$lvMeNews.Consultar();		
	}
	else
	{

		
	}
}

function oNewsDeleteNOK(httpRequest, textStatus, errorThrown) {
	$.mobile.loading( 'hide' );

	if(httpRequest.status = 500)
	{
		try{
			var errorJson = JSON.parse(httpRequest.responseText);
			showError(errorJson.Error);
		}
		catch(any){
			showError(httpRequest.responseText);		
		}	
	}
	else
	{		
		showError("Error al borrar el mensaje.\n" + textStatus + errorThrown.message);	
	}
}
