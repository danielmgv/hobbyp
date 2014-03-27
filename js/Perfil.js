
function loadPerfilPop()
{	
	$("#MyName").text(fromServer.People.Name);
	$("#MyEmail").text(fromServer.People.Email);
	recargarFotos();
	//ajaxFormPerfilLoad();	
}

function recargarFotos()
{	
	$(".MyPhotoClass").each(
		function() {
			var ruta = "../Data/People_" + fromServer.People.Id + "/PersonalFile_" + fromServer.People.Id  + ".dat";			
			imageFromServer($(this), ruta, fromServer.People.Photo);
		}
	);	
}

function SignOut()
{
	fromServer = null;
	hrefParams('../index.html');
}
