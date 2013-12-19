
<?php

include '../include/Utils.php';


$respuesta = "";
$resultado = FALSE;

$RutaDestino = GetRequest("Ruta");
$NuevoNombre = GetRequest("NuevoNombre");
$NombreOriginal = GetRequest("NombreOriginal");
$IdAlumno = GetRequest("IdAlumno");

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

$allowedExts = array("gif", "jpeg", "jpg", "png");
$explodeVar = explode(".", $_FILES["file"]["name"]);
$extension = end($explodeVar);
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
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
	
		if (file_exists("upload/" . $_FILES["file"]["name"]))
		{
			$respuesta = $_FILES["file"]["name"] . " already exists. ";
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
				$respuesta = "Stored in: " . $rutaCompleta;			
				$resultado = TRUE;
			}
			else
			{
				$respuesta = $rutaCompleta;	
			}
		}	
	}
  }
else
  {
  $respuesta = "Invalid file" . $_FILES["file"]["type"] . $_FILES["file"]["size"];
  }  
?>

<!DOCTYPE  HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
<html>
	<head>
		<script>
			//debugger;
			<?php
			if($resultado)
			{
			?>
				//alert("Guardado");
				parent.documentoGuardado();
			<?php
			}
			?>
		</script>
	</head>
	<body>
		<?php echo $respuesta ?>
	</body>
</html>