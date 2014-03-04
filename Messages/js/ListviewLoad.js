
jQuery.fn.ListviewLoad = function(params){
	return new ListviewLoad(this, params);
};

function ListviewLoad($Container, params) {    
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
        //_Listado.vaciar();

        if(hayError(data))
		{	
			return;
		}
        
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
    	var $option = '<option value="'+ row[params.Clave] +'">'+ row[params.Titulo] +'</option>';
		
		$Container.append($option);
		$Container.selectmenu("refresh");
		//$Container.Listview("refresh");		
    };
    
    
    this.vaciar = function() {
        $Container.html('');
    };
}
