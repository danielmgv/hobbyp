
$(document).bind('pageinit', function(){retrieveParams(); loadLang("index.html");	pageinit();	});

function pageinit()
{
	if(fromServer && fromServer.People)
	{
		//alert(fromServer.People.Name);
		hrefParams("../News/News.html");		
	}
	else
	{
		//$("#pageId").show();
	}
	
}
