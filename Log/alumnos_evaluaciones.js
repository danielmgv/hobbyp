
var periodo = obtenerPeriodoCurso();
var rutaEliminar = "../images/Eliminar.gif";
var listadoControles;
var paramsClase ={
		Table: "tipo_clase",
		Value: "Id", 
		Text: "Nombre",
		Default: {Text:"", Value: ""}
	};	
var paramsCurso ={
		Table: "tipo_curso",
		Value: "Id", 
		Text: "Nombre",
		Default:{Text:"", Value:""}
	};	
var paramsAsignatura ={
		Table: "asignaturas",
		Value: "Id", 
		Text: "Nombre",
		Default:{Text:"", Value:""}
	};		
var paramsUDidacticaControl ={
		Table: "unidadesdidacticas",
		Value: "Id", 
		Text: "Nombre",
		Default:{Text:"", Value:""}
	};			
var paramsEvaluacion ={
	Table: "tipo_evaluacion",
	Value: "Id", 
	Text: "Nombre",
	//JoinField: "IdAsignatura",
	//JoinValue: "",
	Default:{Text:"", Value:""}
	};	
	
$(document).ready(documentReady);

 function documentReady() {		
	Consultar();
 
	//$(".boton").button();
	$("#Clase").Cargar(paramsClase);
	$("#Curso").Cargar(paramsCurso);	
	$("#EvaluacionControl").Cargar(paramsEvaluacion);
	$("#Asignatura").Cargar(paramsAsignatura);
	$("#UDidacticaControl").Cargar(paramsUDidacticaControl);
	 
	$(".filtro").change(function(i) {
		Consultar();
	}
	);

	$(".filtro").keypress(function(e) {	
	if (e.which == 13) {
			Consultar();
		}
	}); 
	
	$(".filtro2").change(function(i) {
		listadoControles.Consultar();
	}
	);

	$(".filtro2").keypress(function(e) {	
	if (e.which == 13) {
			listadoControles.Consultar();
		}
	}); 

	$("#Peso").numeric();
	
	$("#addControlForm").dialog({
		width: 600,
		height: 390,
		autoOpen: false,
		show: "blind",
		hide: "blind",
		buttons: {
			"Aceptar": function() {

				guardarControl();

			},
			"Cancelar": function() {

				
				$(this).dialog("close");
			}
		}
    });
	
	inicializarListadoControles();
}

function inicializarListadoControles()
{
	//" order by saldos.Agrupacion, CentroPpto"
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
			width: 100,
			campoOrden: 'Asignatura',
			campo: 'Asignatura',
			tipo: 'text',
			texto: 'Asignatura',
			orderByDef: true
		},
		{
			width: 300,
			campoOrden: 'UnidadDidactica',
			campo: 'UnidadDidactica',
			tipo: 'text',
			texto: 'Unidad Didactica',
			orderByDef: true
		},
		{
			width: 16,                
			tipo: 'SelectCheck',
			texto: 'Asignar'                
		}	        
	];

	var params = {
		subdir: '../',
		cols: cols,
		obtenerSql: ObtenerSqlControles // función que devuelve sql de consulta según los filtros aplicados
	};
	
	listadoControles = $("#listadoControles").Listado(params);
}

function ObtenerSqlControles()
{
	var sql = "SELECT C.Id, C.Nombre, U.Nombre as UnidadDidactica, A.Nombre as Asignatura ";		
	var sqlFROM = " FROM controles C ";
	sqlFROM += " LEFT JOIN unidadesdidacticas U ON U.Id = C.IdUnidadDidactica ";	
	sqlFROM += " LEFT JOIN asignaturas A ON A.Id = C.IdAsignatura ";	
		
	var sqlWhere = " where 1 = 1 ";
	
	if($("#Nombre").val()!="")
	{
		sqlWhere += " AND C.Nombre LIKE '%" + $("#Nombre").val() + "%'";     	
	}
	
	if($("#UDidacticaControl").val()!="" && $("#UDidacticaControl").val() != undefined)
	{
		sqlWhere += " AND C.IdUnidadDidactica = " + $("#UDidacticaControl").val();        	
	}
	
	if($("#Asignatura").val()!="" && $("#Asignatura").val() != undefined)
	{
		sqlWhere += " AND C.IdAsignatura = " + $("#Asignatura").val();        	
	}
	
	var sqlGroup = "";

	return sql + sqlFROM + sqlWhere;
}

//********************************
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

function guardarControl(idAlumno, idControl)
{
	//debugger;
	
	var IdControles = listadoControles.GetChecked();	

	var alumnosSelect = [];
	$(".checkClass").each(function()
	{
		if($(this).is(":checked"))
		{
			alumnosSelect.push($(this).attr("IdAlumno"));
		}
	});
	 
	var numAlumnos = alumnosSelect.length;
	var alumnoId = null;
	for (var i = 0; i < numAlumnos; i++) {
	  alumnoId = arr[i];
	  guardarControlesAlumno(IdControles, alumnoId);
	}	
}

function guardarControlesAlumno(IdControles, IdAlumno)
{
	var paramsProcedure =
	[
		IdAlumno,
		IdControles,
		getMySQLNumber("Peso"),
		getMySQLNumber("EvaluacionControl"),
		periodo
	];	

	var params = {paramsProcedure : paramsProcedure};
	
	params.Procedure = 'ALControlesInsert';
	params.fnCall = AsyncCallProcedure,
	params.fnOK = guardarControlesAlumnoOK;
	params.fnNOK = guardarControlesAlumnoNOK;	

	ccb.feedBack.loading();	
	CallMySQL(params);
}

function guardarControlesAlumnoOK(data) {	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		Consultar();
		$alert("Control asociado a los alumnos");
		$("#addControlForm").dialog("close");
		
	}
}

function guardarControlesAlumnoNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		$error("Error al asociar el control.<br/>" + data.Error);
	}
	catch(any)
	{
		$error("Error al asociar el control.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}


//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
var sql;
function ObtenerSql() {		
	sql = " Select A.Id as IdAlumno, A.Nombre, A.Apellidos, C.Id as IdControl, C.Nombre as Control, AC.Peso, AC.Nota, AC.IdEvaluacion ";	
	sql += " , Clase.Nombre as Clase, Curso.Nombre as Curso ";
	sql += " from Alumnos A ";
	sql += " JOIN al_periodo AP ON AP.IdAlumno = A.Id ";
	sql += " LEFT JOIN al_controles AC ON AC.IdAlumno = A.Id AND AP.Periodo = AC.Periodo";
	sql += " LEFT JOIN controles C ON C.Id = AC.IdControl ";
	 
	if($("#Asignatura").val()!="" && $("#Asignatura").val() != undefined)
	{
		sql += " AND C.IdAsignatura = " + $("#Asignatura").val() + "";       	
	}
	
	sql += " LEFT JOIN tipo_clase Clase ON Clase.Id = AP.IdClase ";
	sql += " LEFT JOIN tipo_curso Curso ON Curso.Id = AP.IdCurso ";
	sql += " WHERE ";		
	sql += " AP.Periodo = '" + periodo + "'";
		

	
	if($("#Curso").val()!="" && $("#Curso").val() != undefined)
	{
		sql += " AND AP.IdCurso = " + $("#Curso").val() + "";       	
	}
	
	if($("#Clase").val()!="" && $("#Clase").val() != undefined)
	{
		sql += " AND AP.IdClase = " + $("#Clase").val() + "";     	
	}
	
	if($("#nombre").val()!="")
	{
		sql += " AND A.Nombre LIKE '%" + $("#nombre").val() + "%'";  	
	}
	
	if($("#apellidos").val()!="")
	{
		sql += " AND A.Apellidos LIKE '%" + $("#apellidos").val() + "%'";        	
	}
	
	return sql;
}

function Consultar()
{
	//vaciarTabla($("#tblEvaluaciones"));
	ccb.feedBack.loading();
    AsyncConsultaSELECT({ SQL: ObtenerSql() }, ConsultarOk, ConsultarNOK);
}
 
function ConsultarOk(data) {	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		RecargarListado(data);
	}
}

function ConsultarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		$error("No se pudo consultar.<br/>" + data.Error + "<br/>" + sql);
	}
	catch(any)
	{
		$error("No se pudo consultar.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message + "<br/>" + sql);
	}
}

function vaciarTabla(tblEvaluaciones) {
	ultimoAlumno = null;
	clase = "";
	//tblEvaluaciones.css("width", "");
	$('#tblEvaluaciones tr').each(function(index) {
		if(index > 1)
		{
			$(this).remove();
		}
	});
}
var tblEvaluaciones;

function RecargarListado(data){
	
	var tblEvaluaciones = $("#tblEvaluaciones");
	
	vaciarTabla(tblEvaluaciones);
	if (data.NumRegistros == 0) {
		var tr = $('<tr>');
		var td = $('<td nowrap align="center" colspan="5">');
		td.text("No se encontraron registros.");
		//tblEvaluaciones.css("width", "100%");
		tr.append(td);
		tblEvaluaciones.append(tr);
	}
	else {
		for (var i = 0; i < data.NumRegistros; i++) {		
			addRow(data[i]);			
		}
	}
}

function addTd(tr, clase, valor) {
	var texto = valor != null ? valor : "";
	return $('<td class="' + clase + '">' + texto + '</td>').appendTo(tr);
}

function addTdCheck(tr, clase, row) {
	var td1 = $('<td>');
	td1.addClass(clase);

	var check = $('<input class="checkClass" type="checkbox" checked />');
	
	check.attr("IdAlumno", row.IdAlumno);
	 
	//check.attr("checked", row[col.campo]);
/*
	check.change(
		function() {
			col.onChange(row[_key[0]], check.is(":checked"));
		}
	);
*/
	td1.append(check);
	
	tr.append(td1);
	return td1;
}

var clase = "";
var ultimoAlumno = null;

var tblEvaluacion1 = $('<table id="tblEvaluacion1"></table>');
var tblEvaluacion2 = $('<table id="tblEvaluacion2"></table>');
var tblEvaluacion3 = $('<table id="tblEvaluacion3"></table>');

function addRow(row) {
	if(ultimoAlumno && ultimoAlumno == row.IdAlumno && row.Control)
	{
		//Continua con el mismo alumno.
		if(row.Evaluacion)
		{
			var tr = $('#trEvaluacion' + row.Evaluacion); 	
			var tblEvaluacion = $('#tblEvaluacion' + row.Evaluacion); 
			addRowControl(row, tblEvaluacion, tr);
		}		
	}
	
	if (clase == "dato") {
		clase = "datoImpar"
	}
	else {
		clase = "dato";
	}

	var tr = $('<tr>'); 

	addTd(tr, clase, row.Curso + "º " + row.Clase);
	addTd(tr, clase, row.Nombre + row.Apellidos);	

	
	addRowControl(row, tr);
	
	if(row.Evaluacion)
	{
		var trEvaluacion = $('<tr id="trEvaluacion' + row.Evaluacion + '" >'); 	
		var tblEvaluacion = $('<table id = "tblEvaluacion' + row.Evaluacion + '" >'); 
		tblEvaluacion.append(trEvaluacion);
		addRowControl(row, trEvaluacion);
		addTd(tr, clase, tblEvaluacion);
	}		
	/*
	else
	{
		addTd(tr, clase, "");
	}	
	*/
	
	addTdCheck(tr, clase, row);//checkClass
		
	$("#tblEvaluaciones").append(tr);	
}

function addRowControl(row, tr)
{	
	addTd(tr, "", row.Control);
	addTd(tr, "", row.Peso);
	addTd(tr, "", row.Nota);

	var img = $('<img title="Eliminar" src="' + rutaEliminar + '" style="cursor:hand" >');
	img.click(
		function() {
			Eliminar(row.IdAlumno, row.IdControl);
		}
	);
	var td2 = $("<td>");
	td2.append(img);
	td2.addClass(clase);
	td2.css('text-align', 'center');
	td2.css('width', 27);
	tr.append(td2);
}


//---------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
function openAddControl()
{ 
	//debugger;
	var alumnosSelect = [];
	$(".checkClass").each(function()
	{
		if($(this).is(":checked"))
		{
			alumnosSelect.push($(this).attr("IdAlumno"));
		}
	});
	
	if(alumnosSelect.length > 0)
	{	
		$("#addControlForm").dialog("open");
		listadoControles.Consultar();
	}
	else
	{
		$alert("Debe seleccionar algún alumno.");
	}
}

function addControl()
{
	var alumnos = $(".checkClass").attr("IdAlumno");
	
	var paramsProcedure =
	[			
		getMySQLNumber("IdControl"),
		getMySQLText("Peso"),
		getMySQLNumber("Evaluacion"),
		getMySQLText("Observaciones"),
		alumnos
	];

	var params = {paramsProcedure : paramsProcedure};
	
	params.Procedure = 'ALControlInsert';
	params.fnCall = AsyncCallProcedure,
	params.fnOK = addControlOK;
	params.fnNOK = addControlNOK;	

	ccb.feedBack.loading();	
	CallMySQL(params);
}

function addControlOK(data) {	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		$alert("Control añadido");
		Consultar();
	}
}

function addControlNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		$error("Error al añadir el control.<br/>" + data.Error);
	}
	catch(any)
	{
		$error("Error al añadir el control.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}

//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

function Eliminar(idAlumno, idControl)
{
	var paramsProcedure =
	[			
		idAlumno,
		idControl
	];

	var params = {paramsProcedure : paramsProcedure};
	
	params.Procedure = 'ALControlDelete';
	params.fnCall = AsyncCallProcedure,
	params.fnOK = EliminarOK;
	params.fnNOK = EliminarNOK;	

	ccb.feedBack.loading();	
	CallMySQL(params);
}

function EliminarOK(data) {	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		$alert("Control eliminado");
		Consultar();
	}
}

function EliminarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();	
	try
	{
		var data = jQuery.parseJSON(httpRequest.responseText);	
		$error("Error al eliminar el control.<br/>" + data.Error);
	}
	catch(any)
	{
		$error("Error al eliminar el control.<br/>" + httpRequest.responseText + "<br/>" + textStatus + "<br/>" + errorThrown.message);
	}
}


//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
function imprimir() {
    var frm = document.getElementById("aa");
    var params = ObtenerParams();
    frm.src = frm.getAttribute("pagina") + "&" + $.param(params);
}

//***************************************************


function Eliminar(row)
{	
	if(confirm("¿Desea borrar el alumno?"))
	{
		ccb.feedBack.loading();
		var sqlProcedure;

		sqlProcedure = 'AlumnoDelete';
		var params = row.Id;

		AsyncCallProcedure(sqlProcedure + "(" + params + ")", EliminarOK, EliminarNOK);
	}
}

function EliminarOK(data) {
	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		alert("Alumno borrado");		
		listado.Consultar();
	}
}

//900901300

function EliminarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();
	alert("Error al borrar.\n" + textStatus + errorThrown.message);	
}


function addTdMyFunction4(tr, clase, row)
{
	if(row.IdFoto != null)
	{
		var ruta = encodeURIComponent(row.Ruta + row.Id + "_" + row.IdFoto + ".dat");		
		var urlfoto = "../include/Image.php?NombreOriginal=" + row.NombreOriginal + "&Ruta=" + ruta;
		
		//$("#idFoto").attr("src", urlfoto);
		
		//var rutafoto = "../include/Image.php?NombreOriginal=" + row.NombreOriginal + "&Ruta = " + CONS_RUTA + row.Id + "/" +  row.Id + "_" + row.IdFoto + ".dat";
		return $('<td class="' + clase + '"><img height="50"  src="' + urlfoto + '"></td>').appendTo(tr);
	}
	else
	{
		return $('<td class="' + clase + '"></td>').appendTo(tr);
	}
}

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









