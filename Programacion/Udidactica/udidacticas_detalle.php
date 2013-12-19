
<!doctype html>
 
<html lang="es">
<head>
	<title>Detalle de Unidad Didactica</title>
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
			UnidadDidactica : null,
			Pagina : ''
		};
	</script>
	<script src="../../js/tipos.js" type="text/javascript"></script>
	<script src="../../js/Comun.js" type="text/javascript"></script>		
	<script src="../../js/MySQLLib/MySQL.js" type="text/javascript"></script>
	<script src="js/udidacticas_detalle.js" type="text/javascript"></script>
</head>
<body class="ui-widget-content"> 
	<form>
		<table border="0">

			<tr>
				<td>
					Nombre:		
				</td>
				<td>
					<input type="text" id="Nombre" name="Nombre" />		
				</td>
				<td>
					Asignatura:		
				</td>
				<td>
					<select name="Asignatura" id="Asignatura" >						
					</select>
				</td>

			</tr>
			<tr>
				<td>
					Observaciones:		
				</td>
				<td>
				</td>
				<td>
				</td>
				<td>						
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<textarea id="Observaciones" maxlength="200" name="Observaciones" cols="80" rows="5" ></textarea>
				</td>
			</tr>
		</table>
	
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
	</form>
</body>
</html>

