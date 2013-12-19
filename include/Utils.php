<?php
define("RUTALOG", "../Log/");
define("RUTAERROR", "../Error/");

date_default_timezone_set("Europe/Madrid");

$clientIp = $_SERVER['REMOTE_ADDR'];
//$clientIpFORWARDED = $_SERVER['HTTP_X_FORWARDED_FOR'];
$hostName = gethostname();


function ResponseError($errorParam) {
	header("HTTP/1.1 500 Internal Server Error");		
	LogWrite("Error ".$errorParam);
	ErrorWrite($errorParam);
	$respuesta['Error'] = $errorParam;
	echo json_encode($respuesta);
	exit();
}

function GetRequest($varname) {
	if (isset($_REQUEST[$varname]) && $_REQUEST[$varname] != "") {
		return ($_REQUEST[$varname]);
	}
}

function LogWrite($mensaje)
{
	//ResponseError($mensaje);
	$clientIp = $_SERVER['REMOTE_ADDR'];
	//$clientIpFORWARDED = $_SERVER['HTTP_X_FORWARDED_FOR'];
	$hostName = gethostname();

	$hoy = date("Ymd");
	$ahora = date("H:i:s");
	$nombre_fichero = RUTALOG. $hostName. $hoy. '.txt';
	$fp = fopen($nombre_fichero,"a");
	
	$mensaje = $ahora."-". $clientIp . "-". $mensaje.".\n";
	fwrite($fp,$mensaje);	
	fclose($fp);	
}

function ErrorWrite($mensaje)
{
/*
	$clientIp = $_SERVER['REMOTE_ADDR'];
	//$clientIpFORWARDED = $_SERVER['HTTP_X_FORWARDED_FOR'];
	$hostName = gethostname();

	$hoy = date("Ymd");
	$ahora = date("H:i:s");	
	$nombre_fichero = RUTAERROR. $hostName. $hoy. '.txt';
	$fp = fopen($nombre_fichero,"a");	
	
	$mensaje = $ahora."-". $clientIp . "-". $mensaje.".\n";
	fwrite($fp,$mensaje);	
	fclose($fp);	
*/	
}

?>
