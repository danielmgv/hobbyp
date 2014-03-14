

function ServerFile(paramsAux)
{	
	var jqxhr;
	
	this.Delete = function ()
	{	
		var params = {};
		params["FUNCTION"] = "DeleteFile";
		params["PATH"] = paramsAux.PATH;		
		
		jqxhr = $.post(AjaxService, params, function(){},"json")
			.done(
				function(data, textStatus, jqXHR)
				{
				    if(!hayError(data))
					{
						SeverFileDeleteOK(paramsAux);
		        	}
				}
			)
			.fail(
				function(httpRequest, textStatus, errorThrown)
				{		
					if(!hayError(httpRequest))
					{
						showError("Error: " + textStatus + errorThrown.message + httpRequest.responseText);			
					}
				}		
			);
	};
	
}
