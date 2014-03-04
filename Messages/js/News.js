$(document).bind('pageinit', function(){retrieveParams(); loadLang(); pageinit(); });

function pageinit(){	
	var params = {
		Clave: "Id",
		ObtenerSQL:ObtenerSQLNews,
		Text:  "Name",
		Value: "Id",
		Table: "oMessages"
		};
	$lvcNews = $("#lvcNews").ListadoNews(params);
	$lvcNews.Consultar();	
	cargarHobbies();
}

function ObtenerSQLNews()
{
	var sql =  " SELECT N.Id, IdPeople, H.Name as HobbieName, Title, Content, ImgFileName, FAlta ";
	sql += " FROM oNews N JOIN ( " + sqlFriendsIdName() + " ) F ON F.FriendId = N.IdPeople ";
	sql += " JOIN ohoobyes H ON H.Id = IdHobbie ";	
	sql += " WHERE DATE_SUB(CURDATE(),INTERVAL 30 DAY) <= N.FAlta ";
	return sql;
}

function sqlFriendsIdName()
{
	var sql = "SELECT DISTINCT IF(G.IdOwner = " + fromServer.People.Id + ", PG.IdPeople, G.IdOwner) as FriendId,  ";
	sql += " IF(G.IdOwner = " + fromServer.People.Id + ", PPeople.Name, POwner.Name) as FriendName ";
	sql += " FROM `op_Group` PG ";
	sql += " JOIN oGroup G ON PG.IdGroup = G.Id ";
	sql += " JOIN opeople POwner ON G.IdOwner = POwner.Id ";
	sql += " JOIN opeople PPeople ON PG.IdPeople = PPeople.Id ";
	sql += " Where ";
	sql += " G.IdOwner = " + fromServer.People.Id + " Or PG.IdPeople = " + fromServer.People.Id;	
	sql += " AND IF(G.IdOwner = " + fromServer.People.Id + ", PG.IdPeople, G.IdOwner) <> " + fromServer.People.Id;	
	return sql;
}

function filterChange()
{	
	$lvcNews.Consultar();
}
//***************************************************************************************************************************

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

