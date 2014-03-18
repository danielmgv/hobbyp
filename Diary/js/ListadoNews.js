
jQuery.fn.ListadoNews = function(params){
	return new ListadoNews(this, params);
};

function ListadoNews($Container, params) {    
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
			showError(textStatus + errorThrown.message + httpRequest.responseText);			
		}
		if (params.fnEnd) params.fnEnd();
    }

    function recargarDatos(data) {   
        vaciar();
        
        if (data.NumRegistros == 0) {
            $Container.append(lang.NotFound.Text);
        }
        else {   
        	if(!hayError(data))
			{
            	for (var i = 0; i <= data.NumRegistros - 1; i++) {                
                	addRow(data[i]);                
            	}
        	}
        }
    }
	
	function space(aux, tam)
	{
		var spaceaux = "";
		for(var i=0;i<tam; i++)
		{
			spaceaux += " ";
		}

		aux = aux + spaceaux;
		
		return aux.substr(1, tam);		
	}
	
    function addRow(row) {
        var $collapsible = $('<div data-role="collapsible" data-theme="a" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-inset="true"></div>');
		$collapsible.append('<h2><span class="content_right_head">' + row.Title + '</span>&nbsp;<span class="content_right_head">' + row.Content + '</span>&nbsp;<span class="content_right_head">' + dateToString(row.FAlta)+ '</span></h2>');
		var $listview = $('<ul data-role="listview"></ul>');
    	$collapsible.append($listview);
    	var $divider = $('<li data-role="list-divider">'+ row.Title +'<span class="ui-li-count">'+ row.HobbieName +'</span></li>');
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
     
        $Container.collapsibleset( "refresh" );  
		showPhoto(row);
    }
    
    function getLiMensaje(row)
    {
    	var $li = $('<li data-icon="delete"></li>');
    	
    	var $a = $('<a href="#"></a>');
    	$a.append('<img id="Photo' + row.Id  + '"/>');
    	$a.append('<h3>' + row.Content  + '</h3>');
		$li.append($a);
		var $a2 = $('<a href="JavaScript:oNewsDelete(' + row.Id + ');"></a>');
		$a2.append(lang.Eliminar.Text);
		$li.append($a2);
    	return $li; 
    }
    
    function vaciar() {
        $Container.html('');
    }
	
	function showPhoto(row)
	{
		var idPhoto = 'Photo' + row.Id;
	    var NuevoNombre = "File_" + row.Id + ".dat";
		var ruta = encodeURIComponent("../Data/People_" + fromServer.People.Id + "/" + NuevoNombre);		
		
		var urlfoto = "../Ajax/include/Image.php?NombreOriginal=" + row.ImgFileName + "&Ruta=" + ruta;
		$("#" + idPhoto).attr("src", urlfoto);
		$("#" + idPhoto).show();	
	}
}
