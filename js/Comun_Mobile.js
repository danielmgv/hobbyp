//-----------------------------------------------------------------------------------------------------------------
//********************************************************************************************************
//CARGAR COMBO
jQuery.fn.CargarMobile = function(params){
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
			
			comboJq.selectmenu('refresh', true);
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
	
	
	if(params.Sync)
	{
		SyncConsultaSELECT({SQL: sql, Cached: false}, this.CargarOk, this.CargarNOk);	
	}
	else
	{		
		if(params.NoCached)
		{
			AsyncConsultaSELECT({SQL: sql, Cached: false}, this.CargarOk, this.CargarNOk);	
		}
		else
		{
			AsyncConsultaSELECT({SQL: sql, Cached: true}, this.CargarOk, this.CargarNOk);	
		}	
	}
	
			
};

//*********************************************************************************************************************************

//-----------------------------------------------------------------------------------------------------------------
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
			comboJq.hide();

			for (var i = 0; i < data.NumRegistros; i++) {
				
				value = data[i].Valor;
				Selected = value == params.Selected ? "SELECTED": "";				
				text = data[i].Texto;	
				var auxStr;
				if(params.JoinField)
				{
					if(data[i].JoinField == params.JoinValue)
					{
						comboJq.append('<li><a href="javaScript:listViewClick("' + value +  '")"></a>' + text + '</li>');						
					}					
					continue;
				}
				auxStr = '<li  ><a href="javaScript:listViewClick(' + value +  ')"></a>' + text + '</li>';
				comboJq.append(auxStr);				
			}
			
			comboJq.listview('refresh', true);
			comboJq.show();
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







