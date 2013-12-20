
<!doctype html>
 
<html lang="es">
<head>
	<title>Detalle de control</title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
	<meta http-equiv="Content-Language" content="es-ES"/>
	<meta name="author" content=""/>

		<link rel="stylesheet" href="../../css/ui-lightness/jquery-ui-1.10.2.custom.css" type="text/css"/>		
		<link rel="stylesheet" href="../../css/educa.css" type="text/css"/>
		
        <script type="text/javascript" src="../../js/jquery.js"></script>
        <script type="text/javascript" src="../../js/jquery-ui.js"></script>
        <script type="text/javascript" src="../../js/jquery.ui.datepicker-es.js"></script>	

        <script language="Javascript" type="text/javascript">
            var fromServer = {
            	Control : null,            	
				Pagina : ''		
			};
	    </script>	        
		<script src="../../js/tipos.js" type="text/javascript"></script>
        <script src="../../js/Comun.js" type="text/javascript"></script>		
		<script src="../../js/MySQLLib/MySQL.js" type="text/javascript"></script>
		<script src="js/controles_detalle.js" type="text/javascript"></script>
</head>
<body class="ui-widget-content"> 
	<form>
		<table border="0">
			<tr>
				<td>
					Nombre:		
				</td>
				<td>
					<input type="text" id="Nombre" name="Nombre" style="width:200px"/>		
				</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>
					Asignatura:		
				</td>
				<td>
					<select name="Asignatura" id="Asignatura" style="width:200px" onchange="changeAsignatura(this.value)">						
					</select>
				</td>
			</tr>
			<tr>
				<td>
					Unidad didáctica:		
				</td>
				<td>
					<select name="UDidactica" id="UDidactica" style="width:200px">						
					</select>
				</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>
					Observaciones:		
				</td>
				<td colspan="3">
					<textarea id="Observaciones" cols="50" rows="6"  name="Observaciones" maxlength="200"></textarea>
				</td>
			</tr>
		</table>
	</form>
	<div id="prueba"></div>
	<div class="footer">
		<table border="0">
			<tr>
				<td>
					<input type="button" class="boton" value="Guardar" onclick="guardar();" />
					&nbsp;
					<input type="button" class="boton" value="Subir documento" onclick="subirDocumento();" />					
				</td>
			</tr>
		</table>
	</div>
</body>
</html>

