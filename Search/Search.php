<?php 
 include '../include/Utils.php';  
?>

<!doctype html>

<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="Content-Language" content="es-ES"/>		
		<link rel="stylesheet" href="css/Bootstrap.css">
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>	
		<script src="../h_js/Comun.js"></script>
		<script src="../h_js/Comun_Mobile.js"></script>
		<script src="../h_js/MySQLLib/MySQL.js"></script>
		<script src="../h_js/MySQLLib/op_hobbyes.js"></script>
		<script src="js/Search.js"></script>
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
		<div data-role="page" data-theme="a" id="one">
			<div data-role="header" data-position="inline">				
				<div data-role="navbar" id="navbarId">
					<ul>
						<li><a href="../H_Messages/Messages.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Messages</a></li>	
						<li><a href="../H_Friends/Friends.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Friends</a></li>						
						<li><a href="../H_Search/Search.php?Id=<?php echo GetRequest('Id'); ?>" class="ui-btn-active"  rel="external" data-ajax="false" data-icon="gear" >Search</a></li>	
						<li><a href="../H_Me/MyPhotos.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Photos</a></li>
						<li><a href="../H_Me/MyHobs.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="search">Hobbies</a></li>						
					</ul>
				</div>
			</div>
			<div data-role="content" data-theme="a">	
				<div data-role="fieldcontain" data-scroll="y">
					<ul id="listHobbies" data-role="listview" data-inset="true" data-filter="true" data-filter-reveal="true" data-filter-placeholder="Search cars...">
					</ul>
				</div>	
				<div data-role="fieldcontain">
					<label for="textarea">Descripción:</label>
					<textarea cols="40" rows="8" name="description" id="description"></textarea>
				</div>
				<button id="addHob">Buscar</button>
				<br/>
				<ul data-role="listview" data-inset="true"  id="listviewId" data-split-icon="Gear">
				</ul>	
				
				<div data-role="popup" id="purchase" data-theme="a" data-overlay-theme="b" class="ui-content" style="max-width:340px;">
					<h3>Send message?</h3>
					<p>
						<textarea cols="40" rows="8" name="message" id="message"></textarea>						
					</p><!-- data-rel="back" -->
					<a href="javascript:sendMessage();" rel="external" data-ajax="false" data-role="button" data-theme="b" data-icon="check" data-inline="true" data-mini="true" >Send</a>
					<a href="index.html" id="btnCancel" data-role="button" data-rel="back" data-inline="true" data-mini="true">Cancel</a>	
				</div>		
			</div>
			<div data-role="footer" class="footer-docs" data-theme="a">
				<p class="jqm-version"></p>
				<p>Hobbyp V.1.0 Research by quaz</p>
			</div>
		</div>
	</body>
</html>

