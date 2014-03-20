<?php

include '../include/Utils.php';
//include ("class.phpmailer.php");
require_once('../include/Mailer/class.phpmailer.php');// Lanza error si no está
//include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

$Username = GetRequest("Username");
$Password = GetRequest("Password");
$AddressEmail = GetRequest("AddressEmail");
$AddressName = GetRequest("AddressName");
$Language = GetRequest("Language"); // 'fr'

$respuesta = $Username;

$mail->setLanguage($Language, '/Mailer/language/');

$mail = new PHPMailer(true); // the true param means it will throw exceptions on errors, which we need to catch

$mail->IsSMTP(); // telling the class to use SMTP

try {
  //$mail->Host       = "mail.yourdomain.com"; // SMTP server
  $mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
  $mail->SMTPAuth   = true;                  // enable SMTP authentication
  $mail->SMTPSecure = "ssl";                 // sets the prefix to the servier
  $mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
  $mail->Port       = 465;                   // set the SMTP port for the GMAIL server
  $mail->Username   = $Username;  // GMAIL username
  $mail->Password   = $Password;            // GMAIL password
  
  $mail->AddAddress($AddressEmail, $AddressName);
  
  $mail->SetFrom('name@yourdomain.com', 'First Last');
  $mail->AddReplyTo('name@yourdomain.com', 'First Last');
  $mail->Subject = 'PHPMailer Test Subject via mail(), advanced';
  $mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
  $mail->MsgHTML(file_get_contents('contents.html'));
  $mail->AddAttachment('images/phpmailer.gif');      // attachment
  $mail->AddAttachment('images/phpmailer_mini.gif'); // attachment
  $mail->Send();
 // echo "Message Sent OK</p>\n";
} catch (phpmailerException $e) {
  	ResponseError( $e->errorMessage()); //Pretty error messages from PHPMailer
} catch (Exception $e) {
  	ResponseError( $e->getMessage()); //Boring error messages from anything else!
}
/*
if(!$mail->Send())
{
	ResponseError("Mailer Error: " . $mail->ErrorInfo);
}
else
{}
 */
	$jsonData = array();
	$jsonData = array('Respuesta' => $respuesta) + $jsonData;
	echo json_encode($jsonData);
	exit();


?>

