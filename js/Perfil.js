
function loadPerfilPop()
{
	var src = "../Data/People_" + fromServer.People.Id + "/" + fromServer.People.Photo;
	
	$("#MyName").text(fromServer.People.Name);
	$("#MyEmail").text(fromServer.People.Email);
	$(".MyPhotoClass").attr("src", src);
	//$("#MyPhotoLittle").src(fromServer.People.Photo);
	//ajaxFormPerfilLoad();	
}

function SignOut()
{
	fromServer = null;
	hrefParams('../index.html');
}
