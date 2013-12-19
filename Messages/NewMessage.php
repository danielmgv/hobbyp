
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Nuevo Mensaje</title>

	</head>
	<body>
		
		<div data-role="dialog">	
			<div data-role="header" data-theme="d">
				<h1>Nuevo Mensaje</h1>
			</div>
		
			<div data-role="content">
				<h1>Edite el mensaje</h1>
				<p>Edite en mesaje y envieló</p>
				 <label for="basic">Para:</label>
    			<input type="text" name="ParaParam" id="ParaParam" value=""  />
			 	<label for="basic">Asunto:</label>			 	
    			<input type="text" name="Asunto" id="AsuntoParam" value=""  />
    			<label for="textarea-a">Mensaje:</label>
				<textarea name="MensajeParam" id="MensajeParam">				
				</textarea>
				<a href="" data-role="button" data-theme="b" id="btnEnviar">Enviar</a>       
				<a href="dialog/index.html" data-role="button" data-rel="back" data-theme="c">Cancel</a>    
			</div>
		</div>
	</body>
</html>
