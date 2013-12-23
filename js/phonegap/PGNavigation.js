
function hrefParams(url, fromServer)
{
    window.localStorage.setItem("fromServer",fromServer );
    window.location.href=url;     
}

function retrieveParams()
{
	return window.localStorage.getItem("fromServer");
}

/*
document.addEventListener("deviceready", retrieveParams, false);
function retrieveParams(){};	
*/
