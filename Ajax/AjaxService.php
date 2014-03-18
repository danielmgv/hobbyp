<?php


header('Content-type: application/json;charset=utf-8');

include 'include/Utils.php';
include 'include/BD.php';

LogWrite("BEGIN AJAX");

try{
	set_exception_handler( 'handleException' );
	chooseFunction(GetRequest('FUNCTION') );	
	exit();
} catch(Exception $e) {
	ResponseError($e -> getMessage());
}

function chooseFunction($FUNCTIONPARAM )
{
	LogWrite($FUNCTIONPARAM);
	switch ($FUNCTIONPARAM) {
		case "select" :
			select();
			break;
		case "procedure" :
			procedure();
			break;
		case "procedureScalar" :
			procedureScalar();
			break;	
		case "ejecuteSQL" :
			ejecuteSQL();
			break;	
		case "DeleteFile" :
			DeleteFile();
			break;
		default:
			ResponseError('No llega FUNCTIONPARAM '. $FUNCTIONPARAM);
	}	
}

function DeleteFile()
{
	$file = GetRequest('PATH');
	if(is_file($file))
	{
    	unlink($file); // delete file
    	LogWrite("DELETED: ".$file);
		echo("{}");
		exit();
	}
	else {
		ResponseError($file." Not found");	
	}
}

function handleException( $e ) {
	ResponseError($e -> getMessage());
}

?>

