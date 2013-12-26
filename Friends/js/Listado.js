
jQuery.fn.Listado = function(params){
	return new Listado(this, params);
};

function Listado($Container, params) {    
    var _Listado = this;
    Inicializar();

    function Inicializar() {
    }

    this.Consultar = function() {
		_Listado.ObtenerRegistros(params.ObtenerSQL());     
    };

    this.ObtenerRegistros = function(sql) {   
        AsyncConsultaSELECT({ SQL: sql }, recargarDatos, obtenerRegistrosNOK);        
    };

    function obtenerRegistrosNOK(httpRequest, textStatus, errorThrown) {
		if(!hayError(httpRequest))
		{
			alert("Error al obtener registros\n" + textStatus + errorThrown.message + httpRequest.responseText);			
		}
		if (params.fnEnd) params.fnEnd();
    }

    function recargarDatos(data) {   
        vaciar();
        
        if(params.fnOnLoad)
        {
        	fnOnLoad(data);        	
        }
        
        if (data.NumRegistros == 0) {
            $Container.append("No se encontraron registros.");
        }
        else {   
            for (var i = 0; i <= data.NumRegistros - 1; i++) {                
                addRow(data[i]);                
            }
        }
    }

    function addRow(row) {
    	//debugger;
        var $collapsible = $('<div data-role="collapsible" data-theme="a" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-inset="true"></div>'); 
		$collapsible.append("<h2>" + row[params.Titulo] +"</h2>");
		var $listview = $('<ul data-role="listview"></ul>');
    	$collapsible.append($listview);

    	var $divider = $('<li data-role="list-divider">'+ row.OwnerName +'<span class="ui-li-count">'+ dateToString(row[params.Fecha]) +'</span></li>');
    	$listview.append($divider);
    	var liMensaje = getLiMensaje(row);
        $listview.append(liMensaje);
        $Container.append($collapsible);
        
		$collapsible.trigger('create');
		$collapsible.collapsible();
		
		if ( $listview.hasClass('ui-listview')) {
		    $listview.listview('refresh');
		     } 
		else {
		    $listview.trigger('create');
		     }
     
        //$listview.listview("refresh");
        $Container.collapsibleset( "refresh" );  

    }
    
    function getLiMensaje(row)
    {
//    	var $a = $('<a href="index.html"></a>');
var $a = $('<div></div>');
    	$a.append('<h3>Mensaje</h3>');
    	$a.append('<p><strong>'+ row[params.Descripcion] +'</strong></p>');	
    	//$a.append('<h3>Angela Smith</h3>');
    	//$a.append('<h3><p>My name is Angela Smith, SEO Consultant.</p></h3>');	
    	//$a.append('<h3><p class="ui-li-aside"><strong>' + dateToString(row[params.Fecha]) + '</strong></p></h3>');   
    	var buttons = '';
		buttons += '<a href="JavaScript:oRequestAceptar(' + row[params.Clave] + ');" data-role="button" data-icon="plus" data-mini="true" data-inline="true">Aceptar</a>';
		buttons += '<a href="JavaScript:oRequestUpdateEstado(' + row[params.Clave] + ', 2);" data-role="button" data-icon="delete" data-mini="true" data-inline="true">Rechazar</a>';
		//buttons += '';
    	$a.append(buttons);
    	return $('<li></li>').append($a); 	
    }
    
    function vaciar() {
        $Container.html('');
    }
}
