<?php
include '../include/Utils.php';

$respuesta = "";
$resultado = FALSE;

$RutaDestino = GetRequest("RutaDestino");
$NuevoNombre = GetRequest("NuevoNombre");
$NombreOriginal = GetRequest("NombreOriginal");

if ($_FILES["file"]["error"] > 0)
{
	  ResponseError("Error: " . $_FILES["file"]["error"] );
}

$allowedExts = array("gif", "jpeg", "jpg", "png");
$explodeVar = explode(".", $_FILES["file"]["name"]);
$extension = strtolower(end($explodeVar));
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
//&& ($_FILES["file"]["size"] < 20000)
&& in_array($extension, $allowedExts))
  {
	if ($_FILES["file"]["error"] > 0)
	{
		$respuesta = "Error: " . $_FILES["file"]["error"] . "<br>";
		ResponseError($respuesta);
	}
	else
	{
		if (file_exists("upload/" . $_FILES["file"]["name"]))
		{
			$respuesta = $_FILES["file"]["name"] . " already exists. ";
			ResponseError($respuesta);
		}
		else
		{
			if (!file_exists($RutaDestino)) {
				mkdir($RutaDestino);
			}
			
			$rutaCompleta = $RutaDestino . $NuevoNombre;
			//crear directorio
			$moved = move_uploaded_file($_FILES["file"]["tmp_name"], $rutaCompleta);//$_FILES["file"]["name"]);			
			if($moved)
			{
				if($_FILES["file"]["size"] >= 20000)
				{
					resizeImagen($RutaDestino, $NuevoNombre, 843, 403,$NuevoNombre, $extension);
					//resizeImagen($RutaDestino, $NuevoNombre, 200, 200,$NuevoNombre, $extension);
				}
				
				$respuesta = "Stored in: " . $rutaCompleta;			
				$resultado = TRUE;
			}
			else
			{
				$respuesta = $rutaCompleta;	
				
				ResponseError("tmp_name: ".$_FILES["file"]["tmp_name"]." Ruta completa: ".$respuesta);
			}
		}	
	}
}
else
{
	/*
	if($_FILES["file"]["size"] >= 20000)
	{
			ResponseError("SizeFile");
	}
	*/

	$respuesta = "Invalid file." . $_FILES["file"]["type"] . $_FILES["file"]["size"] . $_FILES["file"]["tmp_name"];
	ResponseError($respuesta);
}  
  
$jsonData = array();
$jsonData = array('Respuesta' => $respuesta) + $jsonData;
echo json_encode($jsonData);
exit();


function resizeImagen($ruta, $nombre, $alto, $ancho,$nombreN,$extension){
    $rutaImagenOriginal = $ruta.$nombre;
    if($extension == 'GIF' || $extension == 'gif'){
    $img_original = imagecreatefromgif($rutaImagenOriginal);
    }
    if($extension == 'jpg' || $extension == 'JPG'){
    $img_original = imagecreatefromjpeg($rutaImagenOriginal);
    }
    if($extension == 'png' || $extension == 'PNG'){
    $img_original = imagecreatefrompng($rutaImagenOriginal);
    }
    $max_ancho = $ancho;
    $max_alto = $alto;
    list($ancho,$alto)=getimagesize($rutaImagenOriginal);
    $x_ratio = $max_ancho / $ancho;
    $y_ratio = $max_alto / $alto;
    if( ($ancho <= $max_ancho) && ($alto <= $max_alto) ){//Si ancho 
  	$ancho_final = $ancho;
		$alto_final = $alto;
	} elseif (($x_ratio * $alto) < $max_alto){
		$alto_final = ceil($x_ratio * $alto);
		$ancho_final = $max_ancho;
	} else{
		$ancho_final = ceil($y_ratio * $ancho);
		$alto_final = $max_alto;
	}
    $tmp=imagecreatetruecolor($ancho_final,$alto_final);
    imagecopyresampled($tmp,$img_original,0,0,0,0,$ancho_final, $alto_final,$ancho,$alto);
    imagedestroy($img_original);
    $calidad=70;
    imagejpeg($tmp,$ruta.$nombreN,$calidad);
    
}
?>

