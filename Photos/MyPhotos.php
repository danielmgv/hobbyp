
<?php 
 include '../include/Utils.php';  
?>

<!doctype html>

<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="Content-Language" content="es-ES"/>
		<title>Hobbyp</title>
		<link rel="stylesheet" href="css/Bootstrap.css">		
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
				
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
	
		<script src="../js/Comun.js"></script>
		<script src="../js/MySQLLib/MySQL.js"></script>
		<script src="js/MyPhotos.js"></script>
		<script src="js/jquery.filestyle.js" type="text/javascript"></script>
		
		<script language="Javascript" type="text/javascript">
			var fromServer = {
				People : {
					Id: "<?php echo  GetRequest('Id'); ?>",
					Name: "<?php echo  GetRequest('Name'); ?>"
					},
				DocumentoGuardado: "<?php echo  GetRequest('DocumentoGuardado'); ?>",
				Respuesta: "<?php echo  GetRequest('respuesta'); ?>"
			};
						
		</script>
	</head>
	<body>
		<div data-role="page" data-theme="a" id="one">
			<div data-role="header" data-position="fixed" >
				<div data-role="navbar" id="navbarId">
					<ul>
						<li><a href="../Messages/Messages.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Messages</a></li>
						<li><a href="../Friends/Friends.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Friends</a></li>
						<li><a href="../Search/Search.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Search</a></li>
						<li><a href="" data-icon="gear" class="ui-btn-active">Photos</a></li>
						<li><a href="../Hobbies/MyHobs.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="search">Hobbies</a></li>
					</ul>
				</div>
			</div>
			<div data-role="content" data-theme="a">	
					<a href="UploadFrame.php?IdPeople=<?php echo  GetRequest('Id'); ?>" data-role="button" data-theme="a" rel="external">Subir foto</a>
					<br/>
					<ul data-role="listview"  id="lstPhotos">
					</ul>				
			</div>
			<div data-role="footer" class="footer-docs" data-theme="a"  data-position="fixed" >
				<p class="jqm-version"></p>
				<p>Hobbyp V.1.0 Research by quaz</p>
			</div>	
		</div>
	</body>
</html>


