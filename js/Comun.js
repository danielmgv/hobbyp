
function resetform() {
    var obj = document.all.form1;
    var i;
    for (i = (obj.all.length - 1); i >= 0; i--) {
        if (obj.all[i].type == "text") {
            obj.all[i].value = "";
            if (obj.all[i].antvalue != null) {
                obj.all[i].antvalue = "";
            }
        }
        if (obj.all[i].type == "select-one") {
            obj.all[i].options[0].selected = true;
            obj.all[i].fireEvent("onChange");
        }
        if (obj.all[i].type == "checkbox") {
            obj.all[i].checked = false;
            obj.all[i].fireEvent("onClick");
        }
    }
}

//********************************************************************************************************
// Mensajes de error
jQuery.fn.asError = function() {
    return this.each(function() {
        $(this).replaceWith(function(i, html) {
            var newHtml = "<div class='ui-state-error ui-corner-all' style='padding: 0 .7em;'>";
            newHtml += "<p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'>";
            newHtml += "</span>";
            newHtml += html;
            newHtml += "</p></div>";
            return newHtml;
        });
    });
};
 
jQuery.fn.asHighlight = function() {
    return this.each(function() {
        $(this).replaceWith(function(i, html) {
            var newHtml = "<div class='ui-state-highlight ui-corner-all' style='padding: 0 .7em;'>";
            newHtml += "<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'>";
            newHtml += "</span>";
            newHtml += html;
            newHtml += "</p></div>";
            return newHtml;
        });
    });
};

//------------------------------------------------------------------------------------------------
function showError(message)
{	
  // Create it in memory
    var dlg = $("<div />")
        .attr("data-role", "dialog")
        .attr("id", "dialog");
    var content = $("<div />")
        .attr("data-role", "content")
        .append($("<span />").html(message));
    content.append("<a href=\"javascript:$('.ui-dialog').dialog('close');$('#dialog').remove(); " +
        "return false;\" data-role=\"button\" data-rel=\"back\">Close</a>");

    dlg.append(content);

    dlg.appendTo($.mobile.pageContainer);

	//$.mobile.pageContainer.
	dlg.append('<a id="lnkDialog" href="#dialog" data-rel="dialog" data-transition="pop" style="display:none;"></a>');
	$("#lnkDialog").click();
    // show the dialog programmatically
//    $.mobile.changePage(dlg, { role: "dialog", transition: "pop" });
}


function showAlert(mensaje)
{
	var $divDialog = $('<div title="Alert"/>').prependTo('body');
	$divDialog.append(mensaje);
	$divDialog.dialog({
		autoOpen: false,
		width: 400,
		height: 200});	
		
	$divDialog.dialog("open");
}

function $alert(mensaje, titulo)
{
	showAlert(mensaje);
}	

function $error(mensaje, titulo)
{
	showError(mensaje);	
}	
//---------------------------------------------------------------------------------------------------------------------------
function obtenerPeriodoCurso()
{
	var cursoActual = "";
	var hoy = new Date();
	cursoActual = hoy.getFullYear();
	if(hoy.getMonth() >= 7)
	{
		cursoActual = cursoActual + "_" + (cursoActual - 1);
	}
	else
	{
		cursoActual = (cursoActual - 1) + "_" + cursoActual;
	}	
	
	return cursoActual;
}
//------------------------------------------------------------------------------------------------------------------------
// DATEPICKER
function convertDatePicker(campoFecha) {
    campoFecha.datepicker({
        showOn: 'button',
        buttonImage: '../images/cal.png',
        buttonImageOnly: true,
        dateFormat: 'dd/mm/yy',
        onClose: function() { campoFecha.attr("disabled", false); },
        changeYear: true,
        yearRange: "1900:2020"
    });
}
//*****************************************************************************************************************************
//TEXTAREA MAXLENGT


//-----------------------------------------------------------------------------------------------------------------------------

jQuery.fn.numeric = function() {
    this.keydown(function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
};

jQuery.fn.outerHTML = function() {
    return jQuery('<div />').append(this.eq(0).clone()).html();
};

//********************************************************************************************************************

function getSqlProcedure(procedure, params)
{
	var parametrosStr = serializeJson(params);
	return procedure + "(" + parametrosStr +")";	
}

function serializeJson(jsonVar)
{
	var serializeArr = [];
	for (var key in jsonVar) {
	  if (jsonVar.hasOwnProperty(key)) {
	  	  switch (Object.prototype.toString.call(jsonVar[key])) {
		    case "[object String]":
		  		serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;
			case '[object Number]':
		  		serializeArr.push(jsonVar[key]);
		  		break;
			case "[object Null]":
		  		serializeArr.push( "Null" );
		  		break;		  		
			case '[object Date]':
			  	serializeArr.push("'" + jsonVar[key].toMysqlFormat()  + "'");
		  		break;
			case '[object Boolean]':
		  		serializeArr.push( jsonVar[key]);
		  		break;
			case 'undefined':
		  		//serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;	  			
			default:
		  		serializeArr.push( "Null" );
		  		break;
			}
	  }	  
	 }
	 return serializeArr.join(",");
}

//***********************************************************************************************************************************

function dateToString (d) {	
	if(!d)
	{
		return "";		
	}
	
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
	return(curr_date + "/" + curr_month + "/" + curr_year);  
}

function dateTimeToString (d) {	
	if(!d)
	{
		return "";		
	}
	
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
	
	var curr_hour = d.getHours();
	var curr_min = d.getMinutes();
	var curr_seg = d.getSeconds(); //getMilliseconds()
	
	return(curr_date + "/" + curr_month + "/" + curr_year + " " + curr_hour + ":" + curr_min + ":" + curr_seg);  
}
//***********************************************************************************************************************************

function tratarError(httpRequest, textStatus, errorThrown, mensaje)
{
	var mensajeAux = mensaje;
	if(httpRequest.status = 500)
	{
		try{
			var errorJson = eval(httpRequest.responseText);
			mensajeAux += "\n" + errorJson.Error;
		}
		catch(any){
			mensajeAux += "\n" + httpRequest.responseText;		
		}	
	}
	else
	{
		mensajeAux += "\n" + textStatus + errorThrown.message;	
	}
	
	alert(mensajeAux);
}

//********************************************************************************************************
//CARGAR LISTVIEW
jQuery.fn.LoadMySQL = function(params){
	//debugger;
	this.html("Cargando....");
	var comboJq = this;	
	
	var sql = "SELECT " + params.Text + " as Texto, " + params.Value + " as Valor ";
	
	if(params.JoinField)
	{
		sql += ", " + params.JoinField + " as JoinField "; 
	}
	
	sql += " FROM " + params.Table;
	
	this.CargarOk = function(data)
	{
		comboJq.html("");
		if(comboJq[0] === undefined)
		{
			return;
		}
		
		if(params.Default)
		{
			comboJq.append('<option value=' + params.Default.Value + '>' + params.Default.Text + '</option>');
		}
		
		if (data.NumRegistros == 0) {
			//alert("No se encontraron titulos.");
		}
		else {
			//var datos = data[1];
			var value, text;
			
			var Selected = "";
			var classjoinValue = "";

			for (var i = 0; i < data.NumRegistros; i++) {
				
				value = data[i].Valor;
				Selected = value == params.Selected ? "SELECTED": "";				
				text = data[i].Texto;	
				var auxStr;
				if(params.JoinField)
				{
					if(data[i].JoinField == params.JoinValue)
					{
						comboJq.append('<li class="ui-screen-hidden"><a href="javaScript:listViewClick("' + value +  '")"></a>' + text + '</li>');						
					}					
					continue;
				}
				var aAux = $("<a>");
				aAux.click(
					function()
					{
						params.fnHref(data[i]);	
					}					
				);
				//aAux.prop("href","javaScript:listViewClick('" + value +  "')");
				aAux.text(text);
				
				var auxLi = $('<li class="ui-screen-hidden" ></li>');				
				auxLi.append(aAux);
				comboJq.append(auxLi);				
			}
			
			comboJq.listview('refresh', true);
		}
	};
	
	this.CargarNOk = function(httpRequest, textStatus, errorThrown)
	{
		comboJq.html("");
		ccb.feedBack.endLoading();
		$error("Error en la carga." + httpRequest.responseText);	
	};
		
		
	if(params.Sync)
	{
		SyncConsultaSELECT({SQL: sql, Cached: false}, this.CargarOk, this.CargarNOk);	
	}
	else
	{		
		if(params.NoCached)
		{
			SyncConsultaSELECT({SQL: sql, Cached: false}, this.CargarOk, this.CargarNOk);	
		}
		else
		{
			SyncConsultaSELECT({SQL: sql, Cached: true}, this.CargarOk, this.CargarNOk);	
		}	
	}
};

//*********************************************************************************************************************************

/**
 * function to load a given js file 
 */ 
var loadJS = function(src) {
     var jsLink = $("<script type='text/javascript' src='"+src+"'>");
     $("head").append(jsLink); 
 };
 
 function loadLang(pageParam)
 {
	var page = "";
	var userLang = navigator.language || navigator.userLanguage;  	
		
	if(pageParam)
	{
		page = pageParam;		
	}
	else
	{
		var path = jQuery(location).attr('href');
		page = path.substr( path.lastIndexOf("/") + 1 );		
	}
	
	if(page.indexOf("=dialog")!= -1)
	{
		return;
	}
	
	var fileLang = "js/lang/" + page + "." + laguageCode(userLang) + ".js";
	
	loadJS(fileLang);
	
	$(".labelMultiidioma").each(
		function()
		{
			var $obj = $(this);
			var objLang = lang[$(this).attr("Id")];
			if(objLang)
			{
				if($obj.val)
				{
					$obj.val(objLang.Value);		
				}
				if($obj.text)
				{
					$obj.text(objLang.Text);			
				}				
				if($obj.attr("placeholder"))
				{
					$obj.attr("placeholder", objLang["placeholder"]);		
				}
				/*
				if($obj.attr("data-filter-placeholder"))
				{
					$obj.attr("data-filter-placeholder", objLang["placeholder"]);
					$("#" + $obj.attr("Id")).listview("refresh");
				}
				*/
			}
		}		
	);
 }
 
 function laguageCode(code)
 {
 	switch (code)
 	{
 		case "es-ES":
 			return "es";
 			break;
 		case "es":
 			return "es";
 			break; 			
		default:
			return "en";
		 			
 	} 	
 }






