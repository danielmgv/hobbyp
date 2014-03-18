
jQuery.fn.ListadoMensajesEnviados = function(params){
	return new ListadoMensajesEnviados(this, params);
};

function ListadoMensajesEnviados($Container, params) {    
    var _Listado = this;
    
    this.Inicializar = function () {
    };
    
    _Listado.Inicializar();

    this.Consultar = function() {
		_Listado.ObtenerRegistros(params.ObtenerSQL());
    };

    this.ObtenerRegistros = function(sql) {   
        AsyncConsultaSELECT({ SQL: sql }, _Listado.recargarDatos, _Listado.obtenerRegistrosNOK);        
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
        
        if(params.fnOnLoad)
        {
        	params.fnOnLoad(data);        	
        }
        
        if (data.NumRegistros == 0) {
            $Container.append("No se encontraron registros.");
        }
        else {   
            for (var i = 0; i <= data.NumRegistros - 1; i++) {                
                _Listado.addRow(data[i]);                
            }
        }
    };

    this.addRow = function (row) {
    	//debugger;
        var $collapsible = $('<div data-role="collapsible" data-theme="a"  data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-inset="true"></div>'); 
		//$collapsible.append("<h2>" + row[params.Titulo] +"</h2>");
		$collapsible.append("<h2>" + row.Asunto +"</h2>");
		
		var $listview = $('<ul data-role="listview"></ul>');
    	$collapsible.append($listview);

    	var liMensaje = _Listado.getLiMensaje(row);
        $listview.append(liMensaje);
        $Container.append($collapsible);
        
		$collapsible.trigger('create');
		//$collapsible.collapsible();
		
		if ( $listview.hasClass('ui-listview')) {
		    $listview.listview('refresh');
		 } 
		else {
		    $listview.trigger('create');
		}
     
        $Container.collapsibleset( "refresh" );  
    };
    
    this.getLiMensaje = function (row)
    {
		var $divAux = $('<div data-role="fieldcontain"></div');
		$divAux.append(row.Mensaje);
		//var buttons = '<a href="JavaScript:EnviarMensaje(' + row[params.Clave] + ', \''+  row[params.Titulo] +'\');" data-role="button" data-icon="bars" data-mini="true" data-inline="true">Responder</a>';
		var buttons = '<br/><a href="JavaScript:oMessageDelete(' + row[params.Clave] + ');" data-role="button" data-icon="minus" data-mini="true" data-inline="true">Borrar</a>';		
    	$divAux.append(buttons);
    	return $('<li></li>').append($divAux); 	
    };
    
    this.vaciar = function() {
        $Container.html('');
    };
}
