
jQuery.fn.ListadoMensajes = function(params){
	return new ListadoMensajes(this, params);
};

function ListadoMensajes($Container, params) {    
    var _ListadoMensajes = this;
    Inicializar();

    function Inicializar() {
    }

    this.Consultar = function() {
		_ListadoMensajes.ObtenerRegistros(params.ObtenerSQL());     
    };

    this.ObtenerRegistros = function(sql) {   
        AsyncConsultaSELECT({ SQL: sql }, recargarDatos, obtenerRegistrosNOK);        
    };

    function obtenerRegistrosNOK(httpRequest, textStatus, errorThrown) {
		if(!hayError(httpRequest))
		{
			alert("Error al obtener registros\n" + textStatus + errorThrown.message + httpRequest.responseText);			
		}
		if (fnEnd) fnEnd();
    }

    function recargarDatos(data) {   
        vaciar();
        
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
        var $collapsible = $('<div data-role="collapsible" data-theme="a" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-inset="true"></div>'); 
		$collapsible.append("<h2>" + row.Fecha +"</h2>");
		var $listview = $('<ul data-role="listview"></ul>');
    	$collapsible.append($listview);
    	var $divider = $('<li data-role="list-divider">'+ row.Nombre +'<span class="ui-li-count">'+ row.NumeroMensajes +'</span></li>');
    	$listview.append($divider);
    	var liMensaje = getLiMensaje(row);
        $listview.append(liMensaje);
        $Container.append($collapsible);
        
		$collapsible.trigger('create');
		$collapsible.collapsible();
        $listview.listview("refresh");
        $Container.collapsibleset( "refresh" );  

    }
    
    function getLiMensaje(row)
    {
    	var $a = $('<a href="index.html"></a>');
    	$a.append('<h3>Angela Smith</h3>');
    	$a.append('<p><strong>Link Request</strong></p>');	
    	$a.append('<h3>Angela Smith</h3>');
    	$a.append('<h3><p>My name is Angela Smith, SEO Consultant.</p></h3>');	
    	$a.append('<h3><p class="ui-li-aside"><strong>6:24</strong>AM</p></h3>');   
    	return $('<li></li>').append($a); 	
    }
    
    function vaciar() {
        $Container.html('');
    }
}
