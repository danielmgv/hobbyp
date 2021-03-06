
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
			alert("Error al obtener registros\n" + textStatus + errorThrown.message + httpRequest.responseText);			
		}
		if (params.fnEnd) params.fnEnd();
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
    	//debugger;
        var $collapsible = $('<div data-role="collapsible" data-theme="a" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-inset="true"></div>');
        
        //$collapsible.append('<div class="ui-block-a" style="border:1px solid black;"><span style="width: 100px;float: left;">' + row.Title + '</span><span>' + dateToString(row.FAlta)+ '</span></div>');
         
		$collapsible.append('<h2><span class="content_right_head">' + row.Title + '</span>&nbsp;<span class="content_right_head">' + row.Content + '</span>&nbsp;<span class="content_right_head">' + dateToString(row.FAlta)+ '</span></h2>');
    
		//$collapsible.append("<h2>" +row.Title + dateToString(row.FAlta) +"</h2>");
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
		var $li = $('<li ></li>');
    	//var $a = $('<a href="JavaScript:oNewsDelete(' + row.Id + ');"></a>');
    	$li.append('<img id="Photo' + row.Id  + '"/>');
    	$li.append('<h3>' + row.Content  + '</h3>');
		//$li.append($a);
    	return $li; 	
    }
    
    function vaciar() {
        $Container.html('');
    }
    
    function showPhoto(row)
	{
		var idPhoto = 'Photo' + row.Id;
	    var NuevoNombre = "File_" + row.Id + ".dat";
		var ruta = encodeURIComponent("../Data/People_" + row.IdPeople + "/" + NuevoNombre);		
		
		var urlfoto = "../Ajax/include/Image.php?NombreOriginal=" + row.ImgFileName + "&Ruta=" + ruta;
		$("#" + idPhoto).attr("src", urlfoto);
		$("#" + idPhoto).show();	
	}
}
