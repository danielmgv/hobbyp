<?php
include 'Utils.php';

//LogWrite("Obtener imagen")

$name = GetRequest('Ruta');
$NombreOriginal = GetRequest('NombreOriginal');

$explodeVar = explode(".", $NombreOriginal);
$extension = end($explodeVar);

$fp = fopen($name, 'rb');

$size = getimagesize($fp);

if ($size && $fp) {
    header("Content-type: {$size['mime']}");
	header("Content-Length: " . filesize($name));
    fpassthru($fp);
    exit;
} else {
    // error
}

/*
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
 */