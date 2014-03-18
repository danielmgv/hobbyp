
$(document).bind('pageinit', function(){retrieveParams(); loadLang(); pageHobbypInit(); });

//***************************************************************************************************************************

function pageHobbypInit()
{
	cargarHobbies();
	pageinit();	
}


function cargarHobbies()
{	
	var params = {
		ObtenerSQL: ObtenerSql,
		Titulo:  "Name",
		Clave: "Id"
	};
	var $lvHobbies = $("#lvHobbies").LvHobbiesLoad(params);
	$lvHobbies.Consultar();		
}

function ObtenerSql()
{
	var sql = "SELECT Id, Name from ohoobyes  ";	
	return sql;
}

function hobbypChange(combo)
{
	if(!fromServer.Hobbyp)
	{
		fromServer["Hobbyp"] = {
			Id: combo.value,
			Text: combo.options[combo.selectedIndex].innerHTML
			};
	}
	else
	{
		fromServer.Hobbyp.Id = combo.value;
		fromServer.Hobbyp.Text = combo.options[combo.selectedIndex].innerHTML;
	}
	
	hrefParams(window.location.href);	
}

function LvHobbiesLoad($Container, params) {    
    var _Listado = this;
    
    this.Inicializar = function () {
    	if(fromServer.Hobbyp)
    	{
    		$Container.html('<option selected value="' + fromServer.Hobbyp.Id + '">'+ fromServer.Hobbyp.Text +'</option>');
    		$Container.selectmenu("refresh");	
    	}
    };
    
    _Listado.Inicializar();

    this.Consultar = function() {
		_Listado.ObtenerRegistros(params.ObtenerSQL());
    };

    this.ObtenerRegistros = function(sql) {   
        AsyncConsultaSELECT({ SQL: sql}, _Listado.recargarDatos, _Listado.obtenerRegistrosNOK);        
    };

    this.obtenerRegistrosNOK = function (httpRequest, textStatus, errorThrown) {
		if(!hayError(httpRequest))
		{
			alert("Error al obtener registros\n" + textStatus + errorThrown.message + httpRequest.responseText);			
		}
		if (params.fnEnd) params.fnEnd();
    };

    this.recargarDatos = function (data) {   
        _Listado.vaciar();

        if(hayError(data))
		{	
			return;
		}
        
        if(params.fnOnLoad)
        {
        	params.fnOnLoad(data);        	
        }
        
        if (data.NumRegistros == 0) {
            $Container.html('<option value="0">'+ lang.NotFoundHobbie.Text +'</option>');   
        }
        else {   
            for (var i = 0; i <= data.NumRegistros - 1; i++) {                
                _Listado.addRow(data[i]);                
            }
            //$Container.show();
        }
    };

    this.addRow = function (row) {
    	var selected = "";
		if(fromServer.Hobbyp && fromServer.Hobbyp == row[params.Clave])
		{			
			//selected = "SELECTED";
			return;	
		}
		
    	var $option = '<option ' + selected + ' value="'+ row[params.Clave] +'">'+ row[params.Titulo] +'</option>';

		
		$Container.append($option);
		$Container.selectmenu("refresh");	
    };
    
    
    this.vaciar = function() {
        //$Container.html('<option value="0">Hobbyp</option>');        
    };
}

jQuery.fn.LvHobbiesLoad = function(params){
	return new LvHobbiesLoad(this, params);
};
