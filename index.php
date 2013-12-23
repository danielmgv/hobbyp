<!doctype html>
<!--
https://github.com/commadelimited/jQuery-Mobile-Bootstrap-Theme
-->
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="Content-Language" content="es-ES"/>
		<title>Hobble</title>
		<link rel="stylesheet" href="css/Bootstrap.css">
		
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>
	
		<script src="js/Comun.js"></script>
		<script src="js/MySQLLib/MySQL.js"></script>
		<script src="js/index.js"></script>	
		
		<script language="Javascript" type="text/javascript">
		</script>
	</head>
	<body>
		<div data-role="page" data-theme="a">
			<div data-role="header">
				<a href="Register/register.php" data-icon="gear" class="ui-btn-left" rel="external">Register</a>
				<h1>Hobbyp</h1>
				<a href="Login/login.php" data-icon="gear" class="ui-btn-right" rel="external">Login</a>				
			</div>			
			<input type="search" name="txtSearch" id="txtSearch" value="" />
					
			<ul data-role="listview"  id="lstSearch">
			</ul>
			
			<div data-role="footer" class="ui-bar">			
				<!--
				<a href="#" data-icon="plus">Add</a>
				<a href="#" data-icon="arrow-u">Up</a>
				<a href="#" data-icon="arrow-d">Down</a>
				-->
			</div>
		</div>
	</body>
</html>


