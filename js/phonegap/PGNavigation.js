
var fromServer = {};

if(document.addEventListener){
	document.addEventListener("deviceready", retrieveParams, false);
}

function hrefParams(url, fromServerParam){
    window.localStorage.setItem("fromServer", fromServerParam);
    window.location.href=url;
}

function retrieveParams(){
	fromServer = window.localStorage.getItem("fromServer");
}
