
<!doctype html>
 
<html lang="es">
	<head>
		<title>Evaluaciones de alumnos</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-15"/>
		<meta http-equiv="Content-Language" content="es-ES"/>
		<meta name="author" content=""/>				
		
		<link rel="stylesheet" href="../css/ui-lightness/jquery-ui-1.10.2.custom.css" type="text/css"/>		
		<link rel="stylesheet" href="../css/educa.css" type="text/css"/>
		
        <script type="text/javascript" src="../js/jquery.js"></script>
        <script type="text/javascript" src="../js/jquery-ui.js"></script>
        <script type="text/javascript" src="../js/jquery.ui.datepicker-es.js"></script>	

        <script language="Javascript" type="text/javascript">
            var fromServer = {};    		 
	    </script>
		
        <script src="../js/Comun.js" type="text/javascript"></script>
		<script type="text/javascript" src="../js/MySQLLib/MySQL.js"></script>		
		<script src="../js/Listado.js" type="text/javascript"></script>		
		<script src="js/alumnos_evaluaciones.js" type="text/javascript"></script>
	</head>

	<body class="ui-widget-content">         
		<form action="alumnos_consulta.asp" method="get" id=form1 name=form1 target=pantalla>
			<table>
				<tr>
					<td>Asignatura:</td>
					<td><Select class="filtro" id="Asignatura" name="Asignatura"></Select></td>					
				</tr>
				<tr>
					<td class="etiqueta">
						Nombre:
					</td>
					<td>
						<input type="text" class="filtro" name="nombre" id="nombre" value=""  style="width:70px" maxlength="10">
					</td>
					<td class="etiqueta">
						Apellidos:
					</td>
					<td>
						<input type="text" class="filtro" name="apellidos" id="apellidos" value="" style="width:150px">
					</td>
				</tr>
				<tr>
					<td class="etiqueta">
						Curso actual:
					</td>
					<td>
						<select name="Curso" id="Curso" style="width:120px" class="filtro" >							
						</select>
					</td>
					<td class="etiqueta">
						Clase actual:
					</td>
					<td class="etiqueta" style="text-align:left;">
						<select name="Clase" id="Clase" style="width:120px" class="filtro" >							
						</select>
					</td>				
				</tr>				
			</table>
		</form>		
		<table id="tblEvaluaciones" border=1>		
			<tr>
				<td colspan="2"></td>
				<td class="cabecera" colspan="3">EVALUACIONES</td>
			</tr>
			<tr>				
				<td class="cabecera">Clase</td>			
				<td class="cabecera">Alumno</td>
				<td class="cabecera">1ª</td>
				<td class="cabecera">2ª</td>
				<td class="cabecera">3ª</td>
			</tr>			
		</table>	
		<br/>
		<input type="button" class="boton ui-button ui-widget ui-state-default ui-corner-all" value="Añadir control" onclick="openAddControl();" id="btnAddControl" name="btnAddControl"/>
		
		<div class="footer">
		<br/>			

			<input type="button" class="boton ui-button ui-widget ui-state-default ui-corner-all" value="Exportar Excel" onclick="ExportarExcel();" id="btnExportar" name="btnExportar"/>
			<input type="button" class="boton ui-button ui-widget ui-state-default ui-corner-all" value="Imprimir" id="buttonimp" name="buttonimp" onclick="imprimir()"/>
		</div>
		<form id="formExcel" name="formExcel" action="P03.asp" method="post" target="pantalla">	
            <input type="hidden" id="Excel" name="Excel" value="SI"/>	
            <input type="hidden" id="datosTabla" name="datosTabla"/>			
        </form> 
        <iframe id='aa' name='aa' style="width:0px;heigth:0px" src="about.blank" pagina="P04_If.asp?"></iframe>
		<div id="addControlForm" title="Añadir control a los alumnos" style="width:1px;height:1px">	
			<table>
				<tr>
					<td class="etiqueta">Unidad didactica:</td>
					<td class="etiqueta">
						<select id="UDidacticaControl" class="filtro2" name="UDidacticaControl"></select>
					</td>
				</tr>
				<tr> 
					<td class="etiqueta">Nombre:</td>
					<td class="etiqueta">
						<input type="text" maxlength="3" class="filtro2" id="Nombre" name="Nombre"/>
					</td>
				</tr>	
				<tr>
					<td class="etiqueta">Tipo:</td>
					<td class="etiqueta">
						<select id="Tipo" class="filtro2" name="Tipo"></select>
					</td>
				</tr>	
				<tr>
					<td class="etiqueta">Modo:</td>
					<td class="etiqueta">
						<select id="Modo" class="filtro2" name="Modo"></select>
					</td>
				</tr>	
				<tr>
					<td>
						<input type="button" class="boton ui-button ui-widget ui-state-default ui-corner-all" value="Actualizar" onclick="listadoControles.Consultar();" id="btnActualizarControles" name="btnActualizarControles"/>
					</td>					
				</tr>					
			</table>	
			<table id="listadoControles" name="listadoControles"></table>
			<table>
				<tr>
					<td class="etiqueta">Evaluación:</td>
					<td class="etiqueta">
						<select id="EvaluacionControl" name="EvaluacionControl"></select>
					</td>
					<td class="etiqueta">Peso:</td>
					<td class="etiqueta">
						<input type="text" maxlength="3" id="Peso" name="Peso"/>
					</td>
				</tr>					
			</table>							
		</div>
	</body>
</html>
