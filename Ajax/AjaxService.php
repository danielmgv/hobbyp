<?php


header('Content-type: application/json;charset=utf-8');

include '../include/Utils.php';
include '../include/BD.php';

LogWrite("BEGIN AJAX");

try{
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
		default:
			ResponseError('No llega FUNCTIONPARAM '. $FUNCTIONPARAM);
	}	
}

function handleException( $e ) {
	ResponseError($e -> getMessage());
}

set_exception_handler( 'handleException' );



?>

