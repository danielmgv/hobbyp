<?php 
 include '../include/Utils.php';  
?>

<!doctype html>

<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="Content-Language" content="es-ES"/>		
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>	
		<script src="../js/Comun.js"></script>
		<script src="../js/Comun_Mobile.js"></script>
		<script src="../js/MySQLLib/MySQL.js"></script>
		<script src="../js/MySQLLib/op_hobbyes.js"></script>
		<script src="js/Friends.js"></script>
		<script src="js/ListFriends.js"></script>
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
		<!--Requests -->
		<div data-role="page" data-theme="a" id="Requests">
			<div data-role="header" data-position="inline">
				<div data-role="navbar" id="navbarId">
					<ul>
						<li><a href="../Messages/Messages.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Messages</a></li>	
						<li><a href="" data-icon="gear" class="ui-btn-active">Friends</a></li>	
						<li><a href="../Search/Search.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Search</a></li>	
						<li><a href="../Photos/MyPhotos.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Photos</a></li>
						<li><a href="../Hobbies/MyHobs.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="search">Hobbies</a></li>						
					</ul>
				</div>
				<div data-role="navbar" id="subNavbarId">
					<ul>
						<li><a href="#Requests" class="ui-btn-active ui-state-persist" >Requests</a></li>				
						<li><a href="#Friends" >Friends</a></li>
						<li><a href="#Groups" >Groups</a></li>
					</ul>
				</div>
				<div data-role="fieldcontain" data-scroll="y">
					<div data-role="fieldcontain" data-scroll="y">
						<div data-role="collapsible-set" id="RequestsList">
						</div>	
					</div>						
				</div>
			</div>		
			<div data-role="footer" class="footer-docs" data-theme="a">
				<p class="jqm-version"></p>
				<p>Hobbyp V.1.0 Research by quaz</p>
			</div>
		</div>
		<!--Friends -->
		<div data-role="page" data-theme="a" id="Friends">
			<div data-role="header" data-position="inline">
				<div data-role="navbar" id="navbarId">
					<ul>
						<li><a href="../Messages/Messages.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Messages</a></li>	
						<li><a href="" data-icon="gear" class="ui-btn-active">Friends</a></li>	
						<li><a href="../Search/Search.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Search</a></li>	
						<li><a href="../Photos/MyPhotos.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Photos</a></li>
						<li><a href="../Hobbies/MyHobs.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="search">Hobbies</a></li>						
					</ul>
				</div>
				<div data-role="navbar" id="subNavbarId">
					<ul>
						<li><a href="#Requests" >Requests</a></li>				
						<li><a href="#Friends" class="ui-btn-active ui-state-persist">Friends</a></li>
						<li><a href="#Groups" >Groups</a></li>
					</ul>
				</div>
				<div data-role="fieldcontain" data-scroll="y">
					<div data-role="fieldcontain" data-scroll="y">
						<ul id="FriendsFilter" data-role="listview" data-inset="true" data-filter="true" data-filter-reveal="true" data-filter-placeholder="Search friends...">
						</ul>
					</div>	
					<div class="content-primary" >
						<ul data-role="listview" data-inset="true"  id="FriendsList" data-split-icon="Gear">
						</ul>
					</div>
					<div class="content-secundary" >
						aaaaaa
					</div>
				</div>
				<div data-role="fieldcontain" data-scroll="y">
					<button id="addFriend">New</button>
				</div>
			</div>
			<div data-role="footer" class="footer-docs" data-theme="a">
				<p class="jqm-version"></p>
				<p>Hobbyp V.1.0 Research by quaz</p>
			</div>
		</div>
		<!--Groups -->
		<div data-role="page" data-theme="a" id="Groups">		
			<div data-role="header" data-position="inline">
				<div data-role="navbar" id="navbarId2">
					<ul>
						<li><a href="../Messages/Messages.php?Id=<?php echo GetRequest('Id'); ?>" class="ui-btn-active" rel="external" data-ajax="false" data-icon="gear" >Messages</a></li>	
						<li><a href="" data-icon="gear" class="ui-btn-active">Friends</a></li>	
						<li><a href="../Search/Search.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Search</a></li>	
						<li><a href="../Photos/MyPhotos.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="gear" >Photos</a></li>
						<li><a href="../Hobbies/MyHobs.php?Id=<?php echo GetRequest('Id'); ?>" rel="external" data-ajax="false" data-icon="search">Hobbies</a></li>						
					</ul>
				</div>
				<div data-role="navbar" id="subNavbarId2">
					<ul>	
						<li><a href="#Requests">Requests</a></li>				
						<li><a href="#Friends">Friends</a></li>	
						<li><a href="#Groups" class="ui-btn-active ui-state-persist">Groups</a></li>											
					</ul>
				</div>
				<div data-role="fieldcontain" data-scroll="y">
					<div class="content-primary" >					
						
					</div><!--/content-primary -->	
				</div><!--/fieldcontain-->
			</div><!--/header-->		
			<div data-role="footer" class="footer-docs" data-theme="a">
				<p class="jqm-version"></p>
				<p>Hobbyp V.1.0 Research by quaz</p>
			</div>					
		</div><!--/page-->		
	</body>
</html>

