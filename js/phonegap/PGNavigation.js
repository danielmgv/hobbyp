

var fromServer = {};

//if(document.addEventListener){
//	document.addEventListener("deviceready", retrieveParams, false);
//}

function hrefParams(url){
    window.localStorage.setItem("fromServer", JSON.stringify(fromServer));
    //$.mobile.changePage(url);
    window.location.href=url;
}

function retrieveParams(){
	fromServer = JSON.parse(window.localStorage.getItem("fromServer"));
}
