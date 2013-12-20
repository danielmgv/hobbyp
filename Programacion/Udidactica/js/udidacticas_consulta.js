
var listado;

$(document).ready(documentReady);   
    
function documentReady() {	
	AjaxService = '../' + AjaxService;
	$(".boton").button();
	
	var cols = [
		{
			width: 100,
			campoOrden: 'Nombre',
			campo: 'Nombre',
			tipo: 'linkPassRow',
			enlace: "udidacticas.php",
			texto: 'Nombre',
			title: "nombre",
			orderByDef: true		        
		},
		{
			width: 100,
			campoOrden: 'Asignatura',
			campo: 'Asignatura',
			tipo: 'text',
			texto: 'Asignatura',
			orderByDef: true
		}         
	];

	var importe = 0;
	var contab = 0;
	var proys = new Array();

	var params = {
		subdir: '../',
		cols: cols,
		fnEliminar: Eliminar,
		obtenerSql: ObtenerSql // función que devuelve sql de consulta según los filtros aplicados
	};

	listado = $("#tablaConCabecera").Listado(params);

	$(".filtro").change(function(i) {
		listado.Consultar();
	}
	);

	$(document).keypress(function(e) {
	if (e.which == 13) {
			$("#btnConsultar").focus();
			listado.Consultar();
		}
	});

	listado.Consultar();        
}

function ObtenerSql() {    
	var sql = "SELECT UD.Id, UD.Nombre, A.Nombre as Asignatura ";		
	var sqlFROM = " FROM unidadesdidacticas UD ";
	sqlFROM += " LEFT JOIN asignaturas A ON UD.IdAsignatura = A.Id ";
	
		
	var sqlWhere = " where 1 = 1 ";
	
	if($("#Nombre").val()!="")
	{
		sqlWhere += " AND UD.Nombre LIKE '%" + $("#Nombre").val() + "%'";     	
	}
	
	if($("#Asignatura").val()!="" && $("#Asignatura").val() != null)
	{
		sqlWhere += " AND UD.IdAsignatura =" + $("#Asignatura").val();        	
	}
	
	return sql + sqlFROM + sqlWhere;
}

function imprimir() {
    var frm = document.getElementById("aa");
    var params = ObtenerParams();
    frm.src = frm.getAttribute("pagina") + "&" + $.param(params);
}

//--------------------------------------------------------------------------------------------------------------------
//********************************************************************************************************************
//ELIMINAR
function Eliminar(row)
{	
	if(confirm("¿Desea borrar la unidad didáctica?"))
	{
		ccb.feedBack.loading();
		var sqlProcedure;

		sqlProcedure = 'UnidadDidacticaDelete';
		var params = row.Id;

		AsyncCallProcedure(sqlProcedure + "(" + params + ")", EliminarOK, EliminarNOK);
	}
}

function EliminarOK(data) {
	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		//$alert("Unidad didactica borrada");
		alert("Unidad didactica borrada");
		listado.Consultar();
	}
}

function EliminarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();
	$error("Error al borrar.\n" + textStatus + errorThrown.message);	
}

//--------------------------------------------------------------------------------------------------------------------
//********************************************************************************************************************
//EXPORTAR EXCEL
function ExportarExcel() {
	$("a").each(
		function() {
			$(this).attr('oldhref', $(this).attr('href'));
		}
	);

	$("a").removeAttr('href');
	var tablaHtml = $("#tablaConCabecera").html();
	$("#datosTabla").val(replaceAll(tablaHtml, "€", ""));

	$("a").each(
	function() {
		$(this).attr('href', $(this).attr('oldhref'));
	});
	$(document.all.formExcel).submit();
}
//***********************************************************************************************************************




