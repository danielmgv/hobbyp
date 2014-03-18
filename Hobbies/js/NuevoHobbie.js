
$(document).bind('pageinit', function(){retrieveParams();loadLang();pageinit();	});

function pageinit(){		
	$("#btnBuscar").on( 'tap', btnBuscarClick );	
}

function btnBuscarClick( event ) {
	$(event.target).addClass( "tap" );
	buscar();
}
//*************************************************************************************************************************************************************************

function buscar()
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
	sql += " Where ";
	sql += " Name LIKE '%" + $("#Nombre").val() + "%'";
	//sql += " AND Description LIKE '%" + $("#Description").val() + "%'";		
	return sql;
}
