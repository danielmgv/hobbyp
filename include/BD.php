<?php

// Database connection values
/*
define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'Admin');
define('DB_PASSWORD', 'Admin');
define('DB_NAME', 'educa');
*/

//HOSTINGER
define('DB_HOST', 'mysql.hostinger.es');
//define('DB_HOST', 'localhost:3306');
define('DB_USERNAME', 'u490265401_admin');
define('DB_PASSWORD', 'Passw0rd.');
define('DB_NAME', 'u490265401_educa');
define('PORT', 3306);


function connect() {
	try {
		//LogWrite("Conectando");
		
		//$mysqli = new mysqli("mysql.hostinger.es", "u490265401_admin", "Passw0rd.", "u490265401_educa", 3306);
		//$mysqli = new mysqli("127.0.0.1", "Admin", "Admin", "educa", 3306);
		//$mysqli = new mysqli("127.0.0.1", "root", "", "educa", 3306);
		
		$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, PORT);
		
		//mysqli_query($mysqli,"SET NAMES 'utf8'");
		//mysqli_query($mysqli,"lower_case_table_names=1");
		
		//echo "El juego de caracter en la base de dato es: ".mysql_client_encoding($conexion);
		if ($mysqli -> connect_errno) {
			//header("HTTP/1.1 500 Internal Server Error");
			$errorVar = "Fallo al conectar a MySQL: (" . $mysqli -> connect_errno . ") " . $mysqli -> connect_error;
			//LogWrite("Error ".$errorVar);
			//ErrorWrite($errorVar);
			ResponseError($errorVar);
			//throw new Exception($errorVar);
		}
		
		date_default_timezone_set('Europe/Madrid');
		//SET time_zone = timezone;
		//LogWrite("Nueva conexion");
	} catch(Exception $e) {
		ResponseError($e -> getMessage());		
	}
	return $mysqli;
}

function select() {
 try
  {
	$SQL = $_REQUEST['SQL'];	
	//LogWrite($SQL);

	$mysqli = connect();	

	if (!$result = mysqli_query($mysqli, $SQL)) {
		ResponseError($mysqli->error);
	}
	
	LogWrite($SQL);
	
	$page = isset($_POST['page']) ? $_POST['page'] : 1;
	
	$jsonData = array();
	 
   /* Obtener la informaci�n de campo de todas las columnas */
    $info_campo = $result->fetch_fields();
	$tipos = array();
	
    foreach ($info_campo as $valor) {
    	$tipos = array($valor->name => $valor->type) + $tipos;
       // printf("Nombre:        %s\n", $valor->name);
        //printf("Tabla:         %s\n", $valor->table);
        //printf("Longitud m�x.: %d\n", $valor->max_length);
        //printf("Banderas:      %d\n", $valor->flags);
        //printf("Tipo:          %d\n", $valor->type);
    }
    
	while ($r = mysqli_fetch_assoc($result)) {
		$jsonData[] = $r;
	}

	$jsonData = array('NumRegistros' => count($jsonData)) + $jsonData;
	$jsonData = array('Tipos' => $tipos ) + $jsonData;
	
	$retString = json_encode($jsonData);
	//	LogWrite($retString);
	echo $retString;
	exit();
  }
 catch (Exception $e)
  {
	ResponseError($e -> getMessage());
  }
}

function procedure() {
	$PROCEDURE = $_REQUEST['PROCEDURE'];

	$mysqli = connect();

	//$mysqli->select_db("educa") or die(mysql_error());

	// EXECUTE THE PROCEDURE
	$SENTENCIA = "CALL " . $PROCEDURE;

	if (!$mysqli -> query($SENTENCIA)) {	
		ResponseError("CALL failed: (" . $mysqli -> errno . ") " . $mysqli -> error . " " . $SENTENCIA);
	} else {
		LogWrite($SENTENCIA);
		echo("{}");
		exit();
	}
}
	
function procedureScalar() {
	$PROCEDURE = $_REQUEST['PROCEDURE'];

	$mysqli = connect();

	// EXECUTE THE PROCEDURE
	$SENTENCIA = "CALL " . $PROCEDURE;
	$result = $mysqli -> query($SENTENCIA);
	
	if (!$result) {
		ResponseError("CALL failed: (" . $mysqli -> errno . ") " . $mysqli -> error . " " . $SENTENCIA);
	} else {	
		
		LogWrite($SENTENCIA);
		
		$jsonData = array();

		while ($r = mysqli_fetch_assoc($result)) {
			$jsonData[] = $r;
		}

		$jsonData = array('NumRegistros' => count($jsonData)) + $jsonData;

		echo json_encode($jsonData);
		exit();
	}
}


function ejecuteSQLScalar() {
	$SQL = $_REQUEST['SQL'];

	$mysqli = connect();

	// EXECUTE THE SQL
	$result = $mysqli -> query($SQL);
	
	if (!$result) {
		ResponseError("SQL failed: (" . $mysqli -> errno . ") " . $mysqli -> error . " " . $SQL);
	} else {	
		
		LogWrite($SQL);
		
		$jsonData = array();

		while ($r = mysqli_fetch_assoc($result)) {
			$jsonData[] = $r;
		}

		$jsonData = array('NumRegistros' => count($jsonData)) + $jsonData;

		echo json_encode($jsonData);
		exit();
	}
}


function ejecuteSQL($SENTENCIA) {
	$PROCEDURE = $_REQUEST['PROCEDURE'];

	$mysqli = connect();

	$result = $mysqli -> query($SENTENCIA);

	if (!$result) {
		LogWrite("E ".$SENTENCIA);
		ResponseError("query failed: (" . $mysqli -> errno . ") " . $mysqli -> error . " " . $SENTENCIA);
	} 
}

	
function procedureScalarParam($PROCEDURE) {
	//$PROCEDURE = $_REQUEST['PROCEDURE'];
	//echo($PROCEDURE);
	//exit();
	$mysqli = connect();

	// EXECUTE THE PROCEDURE
	$SENTENCIA = "CALL " . $PROCEDURE;
	$result = $mysqli -> query($SENTENCIA);
	
	if (!$result) {
		ResponseError("CALL failed: (" . $mysqli -> errno . ") " . $mysqli -> error . " " . $SENTENCIA);
	} else {	
		
		LogWrite($SENTENCIA);
		
		$jsonData = array();

		while ($r = mysqli_fetch_assoc($result)) {
			$jsonData[] = $r;
		}

		$jsonData = array('NumRegistros' => count($jsonData)) + $jsonData;

		return $jsonData;
		//exit();
	}
}


?>

