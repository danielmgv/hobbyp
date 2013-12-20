
var listado;

$(document).ready(documentReady);   
    
function documentReady() {	
	AjaxService = '../' + AjaxService;
	$(".boton").button();

	$("input.fecha").each(function() {
		convertDatePicker($(this));
	});
	
	var cols = [
		{
			width: 150,
			campoOrden: 'Nombre',
			campo: 'Nombre',
			tipo: 'linkPassRow',
			enlace: "controles.php",
			texto: 'Nombre',
			title: "nombre",
			orderByDef: true		        
		},
		{
			width: 300,
			campoOrden: 'UnidadDidactica',
			campo: 'UnidadDidactica',
			tipo: 'text',
			texto: 'Unidad Didactica',
			orderByDef: true
		}        
	];

	var params = {
		subdir: '../',
		cols: cols,
		fnEliminar: Eliminar,
		obtenerSql: ObtenerSql // función que devuelve sql de consulta según los filtros aplicados
	};

	listado = $("#tablaConCabecera").Listado(params);



	var paramsUDidactica ={
		Table: "unidadesdidacticas",
		Value: "Id", 
		Text: "Nombre",
		//JoinField: "IdAsignatura",
		//JoinValue: "",
		Default:{Text:"", Value:""}
	};

	$("#UDidactica").Cargar(paramsUDidactica);	
	
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
	var sql = "SELECT C.Id, C.Nombre, U.Nombre as UnidadDidactica ";		
	var sqlFROM = " FROM controles C ";
	sqlFROM += " LEFT JOIN unidadesdidacticas U ON U.Id = C.IdUnidadDidactica ";	
		
	var sqlWhere = " where 1 = 1 ";
	
	if($("#Nombre").val()!="")
	{
		sqlWhere += " AND C.Nombre LIKE '%" + $("#Nombre").val() + "%'";     	
	}
	
	if($("#UDidactica").val()!="" && $("#UDidactica").val() != undefined)
	{
		sqlWhere += " AND C.IdUnidadDidactica = " + $("#UDidactica").val();        	
	}
	
	var sqlGroup = "";

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
	if(confirm("¿Desea borrar?"))
	{
		ccb.feedBack.loading();
		var sqlProcedure;

		sqlProcedure = 'ControlDelete';
		var params = row.Id;

		AsyncCallProcedure(sqlProcedure + "(" + params + ")", EliminarOK, EliminarNOK);
	}
}

function EliminarOK(data) {
	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{			
		//custom_alert("Control borrado");
		listado.Consultar();
		//alert("Control borrado");
	}
}

function EliminarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		alert("Error al cargar.<br/>" + data.Error);
	}
	catch(any)
	{
		alert("Error al cargar.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
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




