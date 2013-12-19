
<!doctype html>
  
 <?php 
 include '../include/Utils.php';  
?>

<html>
	<head>
		<title>UploadFrame</title>
		
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="Content-Language" content="es-ES"/>
		<meta name="author" content=""/>
		
		<link rel="stylesheet" href="css/Bootstrap.css">
				
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>

		<script src="../h_js/Comun.js"></script>
		<script src="../h_js/MySQLLib/MySQL.js"></script>

		<script type="text/javascript">
			var fromServer = {
				People : {
					Id: "<?php echo GetRequest('IdPeople'); ?>",
					Name: "<?php echo GetRequest('Name'); ?>"
					},
				DocumentoGuardado: "<?php echo  GetRequest('DocumentoGuardado'); ?>",
				Respuesta: "<?php echo  GetRequest('respuesta'); ?>",
				Ruta : "<?php echo GetRequest('RutaServer');  ?>"			
			};
			
		</script>	        
		<script src="js/fileUp.js" type="text/javascript"></script>
	</head>
	
		<body>
		<div data-role="page" data-theme="a" id="one">
			<div data-role="header" data-position="inline">
				<h1>Hobbyp V.1.0</h1>				
				<div data-role="navbar" id="navbarId">
					<ul>
						<li><a href="../Search/search.php" data-icon="gear">Search</a></li>	
						<li><a href="" data-icon="gear" class="ui-btn-active">MyPhotos</a></li>
						<li><a href="MyHobs.php" data-icon="search">MyHobbies</a></li>
					</ul>
				</div>
			</div>
			<div data-role="content" data-theme="a">	
				<form id="formSubirFoto" action="uploadFile.php" data-ajax="false" enctype="multipart/form-data" method="post">  
					 <input type = "hidden" name="IdPeople" id="IdPeople" value="<?php echo  GetRequest('IdPeople'); ?>"/>
					 <input type = "hidden" name="Ruta" id="Ruta" value="<?php echo GetRequest('RutaServer');  ?>"/>
					 <input type = "hidden" name="NombreOriginal" id="NombreOriginal"/>
					 <input type = "hidden" name="NuevoNombre" id="NuevoNombre"/>						
					<div data-role="fieldcontain">
						<label for="file">Foto:</label>
							<input type="file" name="file" id="file" value="" />
							<input type="button"  data-role="button" data-theme="a" value="Aceptar" id="btnAceptar"/>
					</div>	
				</form>		
			</div>
		</div>
	</body>
	
	

</html>