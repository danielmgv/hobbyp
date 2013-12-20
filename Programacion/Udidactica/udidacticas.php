
<!doctype html>
  
 <?php 
 include '../../include/Utils.php';  
?>

<html lang="es">
<head>
	<title>Unidades didácticas</title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
	<meta http-equiv="Content-Language" content="es-ES"/>
	<meta name="author" content=""/>

	<link rel="stylesheet" href="../../css/ui-lightness/jquery-ui-1.10.2.custom.css" type="text/css"/>		
	<link rel="stylesheet" href="../../css/jquery-jgrowl.css" type="text/css"/>
	<link rel="stylesheet" href="../../css/educa.css" type="text/css"/>

	<script type="text/javascript" src="../../js/jquery.js"></script>
	<script type="text/javascript" src="../../js/jquery-ui.js"></script>
	<script type="text/javascript" src="../../js/jquery.ui.datepicker-es.js"></script>	
	<script type="text/javascript" src="../../js/Comun.js"></script>	
	<script src="../../js/MySQLLib/MySQL.js" type="text/javascript"></script>

	<script>
		var fromServer =
		{			
			Perfil : "<?php echo  GetRequest('Perfil'); ?>",		
			UnidadDidactica:
			{
				Id: "<?php echo GetRequest("Id"); ?>"
			}		
		};
	</script>
	<script src="js/udidacticas.js"></script>
</head>

<body>
<div id="tabs" style="z-index:1;position:relative;">
  <ul>
	<li id="tab1" ><a href="#tabs-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
	<li id="tab2" style="display:none"><a href="#tabs-2">Secciones</a></li>
	<li id="tab3" style="display:none"><a href="#tabs-3">Controles</a></li>
  </ul>
  <div id="tabs-1" style="height:500px">
	<iframe id="tab1Frame" style="width:100%;height:100%" border=0 frameborder=0 framespacing=0 scrolling="yes" noresize >			
	    Your browser does not support iframes.
	</iframe>
	</div>
  <div id="tabs-2" style="height: 500px">
	<iframe id="tab2Frame" style="width:100%;height:100%" border=0 frameborder=0 framespacing=0 scrolling="yes" noresize >			
	    Your browser does not support iframes.
	</iframe>
  </div>
    <div id="tabs-3" style="height: 500px">
	<iframe id="tab3Frame" style="width:100%;height:100%" border=0 frameborder=0 framespacing=0 scrolling="yes" noresize >			
	    Your browser does not support iframes.
	</iframe>
  </div>
</div>
 
 
</body>
</html>

