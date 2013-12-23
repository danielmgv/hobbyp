<!doctype html>
<!--
https://github.com/commadelimited/jQuery-Mobile-Bootstrap-Theme
-->
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="Content-Language" content="es-ES"/>
		<title>Hobbyp</title>
		<link rel="stylesheet" href="css/Bootstrap.css">
		
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>
	
		<script src="../js/Comun.js"></script>
		<script src="../js/MySQLLib/MySQL.js"></script>
		<script src="js/register.js"></script>
		
		<script language="Javascript" type="text/javascript">
			var fromServer = {};		
		</script>
	</head>
	<body>
		<div data-role="page" data-theme="a" id="one">
			<div data-role="header" data-position="inline">
				<h1>Hobbyp V.1.0</h1>				
			</div>			
			
			<div data-role="content" data-theme="a">	
				<form action="#" method="get">
					<p>Registered users have total access.</p>

					<div data-role="fieldcontain">
						<label for="name">Name:</label>
						<input type="text" name="name" id="name" value=""  />
						<label for="email">Email:</label>
						<input type="text" name="email" id="email" value=""  />
						<label for="password">Password:</label>						
						<input type="password" name="password" id="password" value="" autocomplete="off">						
						<a data-role="button" id="btnRegister">Save</a>								
					</div>					
				</form>
			</div>				
			<div data-role="footer" class="ui-bar">			
				&nbsp;
			</div>
		</div>	
	</body>
</html>


