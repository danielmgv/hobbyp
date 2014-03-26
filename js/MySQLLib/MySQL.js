//Constant	Field Type
var MYSQL_TYPE_DECIMAL     = 0;//	Decimal
var MYSQL_TYPE_TINY        = 1;//	Tiny (compatible with MYSQL_TYPE_CHAR)
var MYSQL_TYPE_SHORT       = 2;//	Short
var MYSQL_TYPE_LONG        = 3;//	Long
var MYSQL_TYPE_FLOAT       = 4;//	Float
var MYSQL_TYPE_DOUBLE      = 5;//	Double
var MYSQL_TYPE_NULL        = 6;//	Null
var MYSQL_TYPE_TIMESTAMP   = 7;//	Timestamp
var MYSQL_TYPE_LONGLONG    = 8;//	Long long
var MYSQL_TYPE_INT24       = 9;//	Integer
var MYSQL_TYPE_DATE        = 10;//	Date
var MYSQL_TYPE_TIME        = 11;//	Time
var MYSQL_TYPE_DATETIME    = 12;//	Datetime
var MYSQL_TYPE_YEAR        = 13;//	Year
var MYSQL_TYPE_NEWDATE     = 14;//	Date (MySQL 5.0 or later)
var MYSQL_TYPE_VARCHAR     = 15;
var MYSQL_TYPE_BIT         = 16;//	Bit
var MYSQL_TYPE_NEWDECIMAL  = 246;//	Decimal (MySQL 5.0 or later)
var MYSQL_TYPE_ENUM        = 247;//	//	Enumeration (compatible with MYSQL_TYPE_INTERVAL)
var MYSQL_TYPE_SET         = 248;//	Set
var MYSQL_TYPE_TINY_BLOB   = 249;//	Tiny Blob
var MYSQL_TYPE_MEDIUM_BLOB = 250;//	Medium Blob
var MYSQL_TYPE_LONG_BLOB   = 251;//	Long Blob
var MYSQL_TYPE_BLOB        = 252;//	Blob
var MYSQL_TYPE_VAR_STRING  = 253;//	Varstring
var MYSQL_TYPE_STRING      = 254;//	String
var MYSQL_TYPE_GEOMETRY    = 255;//	Geometry


//var AjaxService = 'http://serverajax.bedagoni.hol.es/AjaxService.php';
//$.support.cors = true;
var AjaxService = '../Ajax/AjaxService.php';

//pluginIEXDomainRequest();

var jqxhr;

function getMySQLText(id)
{
	return "'" + $("#" + id).val() + "'"; 
}

function getMySQLNumber(id)
{
	var valor = $("#" + id).val();
	if(valor == undefined || valor == "")
	{
		return "Null";
	}
	else
	{
		return Number(valor);
	}	
}

function CallMySQL(params)
{
	var sql;
	if(params.Procedure)
	{
		sql = params.Procedure + "(" + params.paramsProcedure + ")";	
	}
	else
	{
		sql = params.SQL;
	}
	
	params.fnCall(sql, params.fnOK, params.fnNOK);
}

function AsyncConsultaSELECT(params, fnOk, fnNOK)
{
	if(params.Cached)
	{		
		if(fromServer[params.SQL])
		{
			fnOk(fromServer[params.SQL]);
			//alert("sin consulta");
			return;
		}
	}
	
	//$alert(params.SQL);
	
	params["FUNCTION"] = "select";	
	
	//debugger;
		jqxhr = $.post(AjaxService, params, function(){},"json")
		.done(
			function(data, textStatus, jqXHR)
			{
				if(params.Cached)
				{		
					fromServer[params.SQL] = data;
				}
				tratarRespuestaAjaxOk(data, textStatus, jqXHR, fnOk);
			}
		)
		.fail(
			function(httpRequest, textStatus, errorThrown)
			{				
				//$alert(httpRequest.responseText);
				fnNOK(httpRequest, textStatus, errorThrown);
			}		
		);

}

function SyncConsultaSELECT(params, fnOk, fnNOK)
{
	params["FUNCTION"] = "select";
	
	jqxhr =$.ajax({
			type: 'POST',
			url: AjaxService,
			data: params,
			success: function(data, textStatus, jqXHR)
			{
				tratarRespuestaAjaxOk(data, textStatus, jqXHR, fnOk);
			},
			error: function(httpRequest, textStatus, errorThrown)
			{				
				fnNOK(httpRequest, textStatus, errorThrown);
			},
			dataType: "json",
			async:false
		});	
}

function AsyncCallProcedure(procedure, fnOk, fnNOK)
{	
	var params = {};
	params["FUNCTION"] = "procedure";
	params["PROCEDURE"] = procedure;
	
	jqxhr = $.post(AjaxService, params, function(){},"json")
		.done(
			function(data, textStatus, jqXHR)
			{
				tratarRespuestaAjaxOk(data, textStatus, jqXHR, fnOk);
			}
		)
		.fail(
			function(httpRequest, textStatus, errorThrown)
			{				
				//$alert(httpRequest.responseText);
				fnNOK(httpRequest, textStatus, errorThrown);
			}		
		);
}


function AsyncCallProcedureScalar(procedure, fnOk, fnNOK)
{	
	var params = {};
	params["FUNCTION"] = "procedureScalar";
	params["PROCEDURE"] = procedure;
	
	jqxhr = $.post(AjaxService, params, function(){},"json")
		.done(
			function(data, textStatus, jqXHR)
			{
				tratarRespuestaAjaxOk(data, textStatus, jqXHR, fnOk);
			}
		)
		.fail(
			function(httpRequest, textStatus, errorThrown)
			{				
				//$alert(httpRequest.responseText);
				fnNOK(httpRequest, textStatus, errorThrown);
			}		
		);
}

function tratarRespuestaAjaxOk(data, textStatus, jqXHR, fnOk)
{	
	if(data.Error != "" && data.Error != undefined)
	{
		//fnOk(data);
		//fnNOK(null, textStatus, {name : "tratarRespuestaAjaxOk", message : jqXHR.responseText});
		//fnNOK(data, textStatus, null);
		//$alert(data.Error); 
		showError(data.Error);
	}
	else
	{	
		//$alert(JSON.stringify(data));
		data = parseTipos(data);
		//alert(JSON.stringify(data));
		fnOk(data);
	}
}

function parseTipos(data)
{
	if(data.Tipos && data.Tipos != undefined)
	{
		var tipos = data.Tipos;
		var numregistros = data.NumRegistros;
	
		$.each(tipos, function(campo, tipo) {
		    if(tipo == MYSQL_TYPE_DATETIME || tipo == MYSQL_TYPE_DATE)
		    {	    	
	    		$.each(data, function(rowId, item) {    
	    			if(rowId < numregistros)	{
	    				data[rowId][campo] = Date.createFromMysql(data[rowId][campo]);
	    			}		
				    
				});	
		    }
		});
		data.Tipos = null;
	}
	return data;
}

/**
 * You first need to create a formatting function to pad numbers to two digits�
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * �and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

Date.createFromMysql = function(mysql_string)
{ 	
   if(typeof mysql_string === 'string')
   {
      var t = mysql_string.split(/[- :]/);

      //when t[3], t[4] and t[5] are missing they defaults to zero
      return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);          
   }

   return null;   
};

function DateToMySQL(idDatePicker)
{
	var fecha = $("#" + idDatePicker).val() != "" ? $("#" + idDatePicker).datepicker( "getDate" ): 'Null';
	if(fecha != 'Null')
	{
		fecha = "'" + fecha.toMysqlFormat()  + "'";
	}
	
	return fecha;
}

//********************************************************************************************************************************
function hayError(data)
{
	if(data && data.Error && data.Error != "" && data.Error != undefined)
	{
		if(lang[data.Error])		
			$error(lang[data.Error].Text);
		else
			$error(data.Error);
			
		return true;
	}	

	return false;
}	

//-----------------------------------------------------------------------------------------------------------------
//********************************************************************************************************
//CARGAR COMBO
jQuery.fn.Cargar = function(params){
	//debugger;
	this.html("Cargando....");
	var comboJq = this;	
	this.CargarOk = function(data)
	{
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
				
				if(params.JoinField)
				{
					if(data[i].JoinField == params.JoinValue)
					{
						comboJq.append('<option '  + Selected +  ' value=' + value + ' >' + text + '</option>');						
					}					
					continue;
				}
				
				comboJq.append('<option '  + Selected +  ' value=' + value + ' >' + text + '</option>');				
			}
		}
	};
	
	this.CargarNOk = function(httpRequest, textStatus, errorThrown)
	{
		ccb.feedBack.endLoading();
		$error("Error en la carga." + httpRequest.responseText);	
	};	
	
	var sql = "SELECT " + params.Text + " as Texto, " + params.Value + " as Valor ";
	
	if(params.JoinField)
	{
		sql += ", " + params.JoinField + " as JoinField "; 
	}
	
	sql += " FROM " + params.Table;
	
	AsyncConsultaSELECT({SQL: sql, Cached: true}, this.CargarOk, this.CargarNOk);	
};

//*********************************************************************************************************************************

function pluginIEXDomainRequest()
{
	if ( window.XDomainRequest ) {
        jQuery.ajaxTransport(function( s ) {
                if ( s.crossDomain && s.async ) {
                        if ( s.timeout ) {
                                s.xdrTimeout = s.timeout;
                                delete s.timeout;
                        }
                        var xdr;
                        return {
                                send: function( _, complete ) {
                                        function callback( status, statusText, responses, responseHeaders ) {
                                                xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
                                                xdr = undefined;
                                                complete( status, statusText, responses, responseHeaders );
                                        }
                                        xdr = new XDomainRequest();
                                        xdr.onload = function() {
                                                callback( 200, "OK", { text: xdr.responseText }, "Content-Type: " + xdr.contentType );
                                        };
                                        xdr.onerror = function() {
                                                callback( 404, "Not Found" );
                                        };
                                        xdr.onprogress = jQuery.noop;
                                        xdr.ontimeout = function() {
                                                callback( 0, "timeout" );
                                        };
                                        xdr.timeout = s.xdrTimeout || Number.MAX_VALUE;
                                        xdr.open( s.type, s.url );
                                        xdr.send( ( s.hasContent && s.data ) || null );
                                },
                                abort: function() {
                                        if ( xdr ) {
                                                xdr.onerror = jQuery.noop;
                                                xdr.abort();
                                        }
                                }
                        };
                }
        });
}
	
}
