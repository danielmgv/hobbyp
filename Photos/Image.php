<?php
include 'Utils.php';

//LogWrite("Obtener imagen")

$name = GetRequest('Ruta');
$NombreOriginal = GetRequest('NombreOriginal');

$explodeVar = explode(".", $NombreOriginal);
$extension = end($explodeVar);

$fp = fopen($name, 'rb');

if ($extension == "image/gif")
{
	header("Content-Type: ". "image/gif");
}
elseif($extension == "jpeg")
{
	header("Content-Type: ". "image/jpeg");
}
elseif($extension == "jpg")
{
	header("Content-Type: ". "image/jpg");
}
elseif($extension == "png")
{
	header("Content-Type: ". "image/png");
}

header("Content-Length: " . filesize($name));

//LogWrite("Fin obtener imagen")

fpassthru($fp);