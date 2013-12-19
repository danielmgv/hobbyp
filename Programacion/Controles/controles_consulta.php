
<html>
	<head>
		<title>Listado de controles</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-15"/>
		<meta http-equiv="Content-Language" content="es-ES"/>
		<meta name="author" content=""/>				
		
		<link rel="stylesheet" href="../../css/ui-lightness/jquery-ui-1.10.2.custom.css" type="text/css"/>		
		<link rel="stylesheet" href="../../css/educa.css" type="text/css"/>
		
        <script type="text/javascript" src="../../js/jquery.js"></script>
        <script type="text/javascript" src="../../js/jquery-ui.js"></script>
        <script type="text/javascript" src="../../js/jquery.ui.datepicker-es.js"></script>	

        <script language="Javascript" type="text/javascript">
            var fromServer = {};    		 
	    </script>
	        
        <script src="../../js/Comun.js" type="text/javascript"></script>
        <script src="../../js/Listado.js" type="text/javascript"></script>
		<script type="text/javascript" src="../../js/MySQLLib/MySQL.js"></script>
		<script src="js/controles_consulta.js" type="text/javascript"></script>
	</head>

	<body class="ui-widget-content">         
    <form action="alumnos_consulta.asp" method="get" id=form1 name=form1 target=pantalla>
		<table>
			<tr>
				<td class="etiqueta">
					Nombre:
				</td>
				<td>
					<input type="text" class="filtro" name="Nombre" id="Nombre" value="" style="width:150px" maxlength="200">
				</td>
				<td class="etiqueta">

				</td>
				<td>

				</td>
			</tr>
			<tr>
			    <td class="etiqueta">
					Unidad Didactica:
				</td>
				<td>
					<select name="UDidactica" id="UDidactica" style="width:150px" class="filtro" >
						<option></option>
					</select>
				</td>
				<td class="etiqueta">
				</td>
				<td class="etiqueta" style="text-align:left;">
				</td>				
			</tr>
		</table>
	</form>
			<table cellpadding="0" cellspacing="0" id="tablaConCabecera"></table>	
			
			<div class="footer">
			<br/>
			    <input type="button" class="boton" value="Consultar" onclick="javascript:listado.Consultar();" id="btnConsultar" name="btnConsultar"/>
			    <input type="button" class="boton" value="Exportar Excel" onclick="ExportarExcel();" id="btnExportar" name="btnExportar"/>
			    <input type="button" class="boton" value="Imprimir" id="buttonimp" name="buttonimp" onclick="imprimir()"/>
			</div>
		<form id="formExcel" name="formExcel" action="P03.asp" method="post" target="pantalla">	
            <input type="hidden" id="Excel" name="Excel" value="SI"/>	
            <input type="hidden" id="datosTabla" name="datosTabla"/>			
        </form>
        <iframe id='aa' name='aa' style="width:0px;heigth:0px" src="about.blank" pagina="P04_If.asp?"></iframe>
	</body>
</html>
