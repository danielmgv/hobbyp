
<!doctype html>
  
 <?php 
 include '../include/Utils.php';  
?>

<html>
	<head>
	<title>FileUp</title>
	
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta http-equiv="Content-Language" content="es-ES"/>
	<meta name="author" content=""/>	
	
	<link rel="stylesheet" href="css/Bootstrap.css">
			
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>

	<script src="../h_js/Comun.js"></script>
	<script src="../h_js/MySQLLib/MySQL.js"></script>
	<script src="js/register.js"></script>	

	<script type="text/javascript">
		var fromServer = {
			Ruta : "<?php echo GetRequest('RutaServer');  ?>"			
		};
	</script>	        
	<script src="js/fileUp.js" type="text/javascript"></script>
</head>
	<body style="border: 0px;margin: 0px;padding: 0px;">
		<form id="formSubirFoto" action="uploadFile.php" data-ajax="false" enctype="multipart/form-data" method="post">  
			Foto: <input name="file" id="file" size="30" type="file">  
				 <input type = "hidden" name="IdPeople" id="IdPeople"/>
				 <input type = "hidden" name="Ruta" id="Ruta"/>
				 <input type = "hidden" name="NombreOriginal" id="NombreOriginal"/>
				 <input type = "hidden" name="NuevoNombre" id="NuevoNombre"/>
		</form>
	</body> 
</html>