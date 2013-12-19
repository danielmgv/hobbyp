
<?php

include '../include/Utils.php';
include '../include/BD.php';


$respuesta = "";
$resultado = FALSE;

$RutaDestino = "../Data/Photos/"; //GetRequest("Ruta");

$NombreOriginal = GetRequest("NombreOriginal");
//$NuevoNombre = date("Ymd") . "_" . $NombreOriginal; //GetRequest("NuevoNombre");
$IdPeople = GetRequest("IdPeople");

$RutaDestino = $RutaDestino . $IdPeople . "/";

if ($_FILES["file"]["error"] > 0)
{
	echo "Error: " . $_FILES["file"]["error"] . "<br>";
	exit();
}
else
{
//echo "Upload: " . $_FILES["file"]["name"] . "<br>";
//echo "Type: " . $_FILES["file"]["type"] . "<br>";
//echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
//echo "Stored in: " . $_FILES["file"]["tmp_name"];  
}

$allowedExts = array("gif", "jpeg", "jpg", "png", "JPG", "GIF", "JPEG", "PNG");
$explodeVar = explode(".", $_FILES["file"]["name"]);
$extension = end($explodeVar);


if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/pjpg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png")
|| ($_FILES["file"]["type"] == "application/octet-stream")
)
&& ($_FILES["file"]["size"] < 20000)
&& in_array($extension, $allowedExts))
{
	if ($_FILES["file"]["error"] > 0)
	{
		$respuesta = "Error: " . $_FILES["file"]["error"] . "<br>";
	}
	else
	{
		//echo "Upload: " . $_FILES["file"]["name"] . "<br>";
		//echo "Type: " . $_FILES["file"]["type"] . "<br>";
		//echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
		//echo "Stored in: " . $_FILES["file"]["tmp_name"];
		//exit();
	
		if (file_exists("upload/" . $_FILES["file"]["name"]))
		{
			$respuesta = $_FILES["file"]["name"] . " already exists. ";
		}
		else
		{
			if (!file_exists($RutaDestino)) {
				mkdir($RutaDestino);
			}
			
			$rutaCompleta = $RutaDestino . date("Ymd") . "_" . $_FILES["file"]["name"];
			//crear directorio
			$moved = move_uploaded_file($_FILES["file"]["tmp_name"], $rutaCompleta);//$_FILES["file"]["name"]);
			if($moved)
			{
				$respuesta = "Stored in: " . $rutaCompleta;			
				$resultado = TRUE;
				photoPathBD($rutaCompleta, $IdPeople, $_FILES["file"]["name"]);
			}
			else
			{
				$respuesta = $_FILES["file"]["tmp_name"]. " a " . $rutaCompleta;	
			}
		}	
	}
}
else
{
  $respuesta = "Invalid file.<br/>" . $_FILES["file"]["type"] . "<br/>" . $_FILES["file"]["size"] . "<br/>" . $extension;
}
  
function photoPathBD($ruta, $IdPeople, $NombreOriginal)
{
	procedureScalarParam("PEOPLE_PHOTO('".$ruta."','". $IdPeople ."','".$NombreOriginal."')");
}  
?>
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta http-equiv="Content-Language" content="es-ES"/>
		<title>upload</title>
		<link rel="stylesheet" href="css/Bootstrap.css">
		
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>
		
		<script>
			//debugger;
			<?php
			if($resultado)
			{
			?>
				//alert("Guardado");
				location.href="MyPhotos.php?Id=<?php echo $IdPeople?>&DocumentoGuardado=true";
				//parent.documentoGuardado();
			<?php
			}
			else
			{
			?>
				alert("Error al guardar <?php echo $respuesta ?>");
				//location.href="MyPhotos.php?IdPeople=<?php echo $IdPeople ?>&respuesta=<?php echo $respuesta ?>";
			<?php
			}
			?>
		</script>
	</head>
		<body>
		<div data-role="page" data-theme="a" id="one">
			<div data-role="header" data-position="inline">
				<h1>Error al guardar foto</h1>	
							
			</div>			
			<div data-role="content" data-theme="a">	
				<?php echo $respuesta ?>
				<input type="button" value="Volver" rel="back" />	
			</div>
		</div>
	</body>
</html>