<?php 
 include '../include/Utils.php';  
?>

<!doctype html>

<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="Content-Language" content="es-ES"/>		
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>	
		<script src="../h_js/Comun.js"></script>
		<script src="../h_js/Comun_Mobile.js"></script>
		<script src="../h_js/MySQLLib/MySQL.js"></script>
		<script src="../h_js/MySQLLib/op_hobbyes.js"></script>
		<script src="js/Messages.js"></script>
		<script src="js/ListadoMensajes.js"></script>
		<script language="Javascript" type="text/javascript">
			var fromServer = {
				People : {
					Id: "<?php echo GetRequest('Id'); ?>",
					Name: "<?php echo GetRequest('Name'); ?>"
					}
			};
		</script>
		<title>Hobbyp</title>
	</head>
	<body>
		<div data-role="page" data-theme="a" id="Recibidos">
			<div data-role="header" data-position="inline">		
				<div data-role="navbar" id="navbarId">
					<ul>
						<li><a href="../H_Messages/Messages.php?Id=<?php echo GetRequest('Id'); ?>" class="ui-btn-active" rel="external" data-ajax="false" data-icon="gear" >Messages</a></li>	
						<li><a href="../H_Friends/Friends.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Friends</a></li>	
						<li><a href="../H_Search/Search.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Search</a></li>	
						<li><a href="../H_Me/MyPhotos.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Photos</a></li>
						<li><a href="../H_Me/MyHobs.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="search">Hobbies</a></li>						
					</ul>
				</div>
				<div data-role="navbar" id="subNavbarId">
					<ul>				
						<li><a href="#Recibidos" class="ui-btn-active ui-state-persist" >Recibidos</a></li>
						<li><a href="#Enviados">Enviados</a></li>
					</ul>
				</div>
				<div data-role="fieldcontain" data-scroll="y">
					<div class="content-primary" >
						<div data-role="collapsible-set" id="ListIdRecibidos">
						</div>	
					</div>
				</div>
			</div>		
			<div data-role="footer" class="footer-docs" data-theme="a">
				<p class="jqm-version"></p>
				<p>Hobbyp V.1.0 Research by quaz</p>
			</div>
		</div>

		<div data-role="page" data-theme="a" id="Enviados">		
			<div data-role="header" data-position="inline">
				<div data-role="navbar" id="navbarId2">
					<ul>
						<li><a href="../M_Messages/Messages.php?Id=<?php echo GetRequest('Id'); ?>" class="ui-btn-active" rel="external" data-ajax="false" data-icon="gear" >Messages</a></li>	
						<li><a href="../H_Friends/Friends.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Friends</a></li>	
						<li><a href="../H_Search/Search.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Search</a></li>	
						<li><a href="../H_Me/MyPhotos.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Photos</a></li>
						<li><a href="../H_Me/MyHobs.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="search">Hobbies</a></li>						
					</ul>
				</div>
				<div data-role="navbar" id="subNavbarId2">
					<ul>				
						<li><a href="#Recibidos"  >Recibidos</a></li>	
						<li><a href="#Enviados" class="ui-btn-active ui-state-persist" >Enviados</a></li>											
					</ul>
				</div>
				
				<div data-role="fieldcontain" data-scroll="y">
					<div class="content-primary" >
						<div data-role="collapsible-set" id="ListIdEnviados">
						</div>	
					</div>
				</div>
				<div data-role="fieldcontain">
				<a href="NewMessage.php?Id=<?php echo GetRequest('Id'); ?>" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">Nuevo mensaje</a>
<!--
	<a href="dialog.html" data-role="button" data-inline="true" data-rel="dialog" data-transition="pop">Nuevo mensaje</a>
					
-->
					
				</div>
			</div><!--/header-->		
			<div data-role="footer" class="footer-docs" data-theme="a">
				<p class="jqm-version"></p>
				<p>Hobbyp V.1.0 Research by quaz</p>
			</div>					
		</div><!--/page-->		
	</body>
</html>

