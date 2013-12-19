

jQuery.fn.Listado = function(params){//(cols, arrayOrder) {
return new Listado(
    params.cols, this, 
    params.obtenerSql, 
    params.paginacion,
    params.fnCalculos,
    params.fnEnd,
    params.obtenerParams, 
    params.clase, 
    params.metodo,
    params.irDetalle,
    params.height,
    params.bottonAdd,
    params.fnEliminar,
    params.fnTratarRows,
    params.trCabecerasClass,
    params.tdCabeceraClass,
    params.incrementoWidth,
    params.cabeceraHeight,
	params.subdir,
	params.fnOk
    );
};

function Listado(cols, tablaParam, obtenerSql, paginacion, fnCalculos, 
                fnEnd, obtenerParams, clase, metodo, irDetalle,
                height, bottonAdd, fnEliminar, fnTratarRows, trCabecerasClass, tdCabeceraClass, incrementoWidth,
                cabeceraHeight, subdir , fnOkParam){
    //var args = arguments[0] || {};
    //this.cols = args.cols;
    
    var _cols = cols;
    var _numPag = 1;
    var _datos;
    //var _topFilas = 1000;
    var _obtenidosTodos = false;
    var _haciaAlante = true;
    var _tablaParam = tablaParam;
    var _tablaId = _tablaParam.attr("id") + "_Listado";
    var _tableDatos = $('<table id="' + _tablaId + '" align="left" border=0 >');
    var _topFilas = paginacion;
    var _sql = "";
    var _listado = this;
    var _tdNumeroPagina;
    var _numeroPaginas = 0;
    var _clase = clase;
    var _metodo = metodo;
	var _subdir = subdir;
    var _fnOkParam = fnOkParam;
    var _arrayOrder = [];
    var _orderBySql = "";
    var img1, img2, img3, img4;
    var _NRegistros;
    var _trPaginacion;
    var _fnEliminar = fnEliminar;
    var _key = [];
    var _trCabecerasClass = trCabecerasClass || "ui-widget-header";
    var _tdCabeceraClass = tdCabeceraClass;
    var _incrementoWidth = incrementoWidth || 0;
    var _cabeceraHeight = cabeceraHeight || "25px";
    var _idDivDatos = 0;
    var divDatosScroll;
	var rutaEliminar = "../images/Eliminar.gif";
	
    Inicializar();

    $(window).resize(function() {
        if (!height) {
            resizeTable();
        }
    });

    this.ResizeTable = function() {
        if (!height) {
            resizeTable();
        }
    };

    function Inicializar() {
	
        //var tableConCabecera = $('<table cellpadding="0" cellspacing="0" id="tablaConCabecera">');
        
        var tr = $('<tr>');
        var td = $('<td>');

        var table = $('<table align="left"  border=0>');
        var trCabeceras = $('<tr id="trCabecera">');
        trCabeceras.addClass(_trCabecerasClass);

        trCabeceras.css("height", _cabeceraHeight);
        
        for (col in _cols) {

            if (cols[col].isKey) {
                _key.push(cols[col].campo);
            }

            var tdCabecera = $('<td align="center" ></td>');

            if (cols[col].texto != null) {
                tdCabecera.text(cols[col].texto);
            }
            
            if (col.classParam)
            {
                tdCabecera.addClass(col.classParam);
            }

            if (_tdCabeceraClass) {
                tdCabecera.addClass(_tdCabeceraClass);
            }
            
            tdCabecera.css("width", cols[col].width);
            
            if (cols[col].campoOrden) {
                tdCabecera.attr("campoOrden", cols[col].campoOrden);
                tdCabecera.click(function() {
                    ordenar($(this).attr("campoOrden"));
                    if (obtenerSql) {
                        _listado.ObtenerRegistros(obtenerSql());
                    }
                    else if (obtenerParams) {
                        _listado.CallDll(obtenerParams(), _clase, _metodo);
                    }
                    else
                    { }
                }
                );
                tdCabecera.hover(function() {
                    $(this).css('cursor', 'pointer');
                }, function() {
                    $(this).css('cursor', 'auto');
                });

                tdCabecera.attr("title", "Ordenar");
                tdCabecera.prepend("<span style='display:inline-block;height:10px;width:12px'></span>");                
                tdCabecera.append("<span id='icon_" + cols[col].campoOrden + "' class='spanOrden' style='display:inline-block;height:10px;width:12px'></span>");                
            }
           
            trCabeceras.append(tdCabecera);
            //tdCabecera.before("&nbsp;");
            if (cols[col].orderByDef) {
                _arrayOrder.push(cols[col].campoOrden);
            }
        }

        if (_fnEliminar) {
            trCabeceras.append("<td style='text-align: center;width:25px' class='cancelados'>Eliminar</td>");
			if(_subdir)
			{
				rutaEliminar = _subdir + rutaEliminar;
			}
        }

        if (_arrayOrder.length > 0)
        {
            _orderBySql = " ORDER BY " + _arrayOrder.toString();
        }
        
        table.append(trCabeceras);

        td.append(table);
        tr.append(td);
        _tablaParam.append(tr);

        var trDatos = $('<tr>');
        var tdDatos = $('<td>');

        trDatos.append(tdDatos);
        
        if (height) {
            divDatosScroll = $('<div style="overflow-y: scroll;height:' + height + 'px">');   
            //divDatosScroll.css("height", height);
        }
        else {
            divDatosScroll = $('<div style="overflow-y: scroll;">');
        }
        
        tdDatos.append(divDatosScroll);
        divDatosScroll.append(_tableDatos);

        _tablaParam.append(trDatos);
        
        if(bottonAdd)
        {
            var trBottonAdd = $('<tr>');
            var tdBottonAdd = $('<td style="text-align:left">');
            trBottonAdd.append(tdBottonAdd);
            var btnStr = '<button id="btnAdd" class="_add cancelados" onclick="btnAddClick();" title="Añadir fichero adjunto">&nbsp;</button>';
            var bottonAddJq =  $(btnStr);
            tdBottonAdd.append(bottonAddJq);
            _tablaParam.append(trBottonAdd);
            
            bottonAddJq.button({
                text: false,
                icons: {
                    primary: "ui-icon-plusthick"
                }
            });
		}

        if (_topFilas) { 
            _trPaginacion = $("<tr>");
            //var tdPaginacion = $("<td>");
            var tablePaginacion = $('<table style="text-align:right">');
            var trPaginacionInterior = $("<tr>");
            
            var tdF1 = $('<td width="16px">');
            img1 = $('<img src="../../images/flecha_ini.gif" id="f1" border="0" alt="Ir a la primera página" WIDTH="16" HEIGHT="16">');
            tdF1.append(img1);

            var tdF2 = $('<td width="16px">');
            img2 = $('<img src="../../images/flecha_re.gif" id="f2" border="0" alt="Ir a la anterior página" WIDTH="16" HEIGHT="16">');
            tdF2.append(img2);

            var tdF3 = $('<td width="16px">');
            img3 = $('<img src="../../images/flecha_AV.gif" id="f3" border="0" alt="Ir a la siguiente página" WIDTH="16" HEIGHT="16">');
            tdF3.append(img3);

            var tdF4 = $('<td width="16px">');
            img4 = $('<img src="../../images/flecha_fin.gif" id="f4" border="0" alt="Ir a la última página" WIDTH="16" HEIGHT="16">');
            tdF4.append(img4);

            var tdNRegistros = $('<td>');
            _NRegistros = $('<input id="NRegistros" value="' + _topFilas + '" onblur="ValidarNumero(this,0)" style="width:30px"/>');
            tdNRegistros.append(_NRegistros);
            tdNRegistros.append(" Registros por página");
            
            _tdNumeroPagina = $('<td>');
            _tdNumeroPagina.css("width", "200px");
            _tdNumeroPagina.css("text-align", "left");
            
            trPaginacionInterior.append(tdF1);
            trPaginacionInterior.append(tdF2);
            trPaginacionInterior.append(tdF3);
            trPaginacionInterior.append(tdF4);
            trPaginacionInterior.append(_tdNumeroPagina);
            trPaginacionInterior.append("&nbsp;");
            trPaginacionInterior.append(tdNRegistros);



            tablePaginacion.append(trPaginacionInterior);
            /*
            tdPaginacion.append(tablePaginacion);
            _trPaginacion.append(tdPaginacion);
            _tablaParam.append(_trPaginacion);
            */
            
            _tablaParam.after(tablePaginacion);

            img1.hide();
            img2.hide();
            img3.hide();
            img4.hide();

            img1.click(
                function() {
                    paginar(false, 1);
                }
            );
            
            img2.click(
                function() {
                    paginar(false, _numPag - 1);
                }
            );

            img3.click(
                function() {
                    paginar(true, _numPag + 1);
                }
            );

            img4.click(
                function() {
                    paginar(true, _numeroPaginas);
                }
            );
            }

            if (height) {
                divDatosScroll.css("height", height);
            }
            else{
                resizeTable();
            }
    }


    function paginar(direccion, numero) {
        _haciaAlante = direccion;
        _numPag = numero;
        if (_haciaAlante && _numPag > 1) {
            img1.show();
            img2.show();
        }
        else if (!_haciaAlante && _numPag == 1) {
            img1.hide();
            img2.hide();
        }
        
        recargarDatos(_datos);
    }

    this.Consultar = function() {
        _numPag = 1;
        if (_tdNumeroPagina) {
            _tdNumeroPagina.html("");
        }
        
        if (obtenerSql) {
            _listado.ObtenerRegistros(obtenerSql(), _fnOkParam);
        }
        else if (obtenerParams) {
            _listado.CallDll(obtenerParams(), _clase, _metodo);
        }
        else
        { }
    };
    
    this.ObtenerRegistros = function(sql, fnOkParam) {
		if (!fnOkParam){ 
			fnOk = recargarDatos;
			}
		else
		{
			fnOk = function(data)
			{
			
				recargarDatos(data);
				fnOkParam(data);
			};
		}
		

        _sql = sql;
        ccb.feedBack.loading();
        AsyncConsultaSELECT({ SQL: sql + _orderBySql }, fnOk, obtenerRegistrosNOK);
    };

	this.AddRow = function(row)
	{
		_tableDatos.append("<tr>" + row + "</tr>");
	};
	
	this.GetChecked = function(colClass)
	{
		var checked = [];
	
		$("input.SelectCheck").each(function() {
			if($(this).is(":checked"))
			{
				checked.push($(this).attr("Id"));
			}
		});	
		
		return checked;
	};
/*
    var trPaginacionClone;
    this.HidePaginacion = function() {

        if (_trPaginacion) {
            trPaginacionClone = _trPaginacion.clone(true, true);
            _trPaginacion.remove();
        }
        //_trPaginacion.hide();
    }

    this.ShowPaginacion = function() {
        //if (_trPaginacion) _trPaginacion.show();
        //_trPaginacion.html(htmlTrPaginacion);
        _tablaParam.append(_trPaginacion);
    }
*/
    function obtenerRegistrosNOK(httpRequest, textStatus, errorThrown) {
        ccb.feedBack.endLoading();  
        $alert("Error al obtener registros.\n" + httpRequest.responseText);
		//divDatosScroll.html(errorThrown.message + " " + errorThrown.stack + "<br/>" + httpRequest.responseText);
		//debugger;
        if (fnEnd) fnEnd();
    }

    function resizeTable() {
	
        if ($(".footer").length) {
            var position = $(".footer").position();
            var tamano = position.top;
            
            var positionTable = divDatosScroll.position();
            var plusPaginacion = _topFilas ? 30 : 0;
            divDatosScroll.css("height", position.top - positionTable.top - plusPaginacion);
        }
		
    }

    function ordenar(campo) {
        _numPag = 1;
        if (campo != null) {            
            var encontrado = false;
            // Si está el primero se cambia a DESC 
            if (_arrayOrder[0] == campo) {
                _arrayOrder.shift();
                _arrayOrder.unshift(campo + " DESC");
                encontrado = true;
            }
            else if (_arrayOrder[0].replace(" DESC", "") == campo) {
                _arrayOrder.shift();
                _arrayOrder.unshift(campo);
                encontrado = true;
            }
            else {
                var arrayOrderAux = jQuery.grep(_arrayOrder, function(value) { return value != campo; });
                arrayOrderAux = jQuery.grep(arrayOrderAux, function(value) { return value != campo + " DESC"; });

                if (arrayOrderAux.length == _arrayOrder.length - 1) {
                    encontrado = true;
                    _arrayOrder = arrayOrderAux;
                    _arrayOrder.unshift(campo);
                }
            }

            if (!encontrado) {
                _arrayOrder.pop();
                _arrayOrder.unshift(campo);            
            }
        }

        _orderBySql = " ORDER BY " + _arrayOrder.toString();
    }    
    
    this.Data = function() {
        return _datos;
    };
    
    function recargarDatos(data) {   

        if (fnTratarRows) {
            data = fnTratarRows(data);
        }

        _datos = data;
        
        vaciarTabla();
        
        if (_NRegistros) {
            _topFilas = (isNaN(_NRegistros.val()) || _NRegistros.val() == 0 || _NRegistros.val() == "") ? 999999999 : _NRegistros.val();
        }
        
        if (data.NumRegistros == 0) {
            var tr = $('<tr>');
            var td = $('<td nowrap align="center" colspan="8">');
            td.text("No se encontraron registros.");
            _tableDatos.css("width", "100%");
            tr.append(td);
            _tableDatos.append(tr);
        }
        else {
            if (irDetalle && data.NumRegistros == 1) {
                irDetalle(data[1]);
                return;
            }
            
            _numeroPaginas = parseInt(data.NumRegistros / _topFilas) + 1;

            var parent = _tableDatos.parent();
            _tableDatos.detach();

            if (_topFilas) {
                var inicio = 1 + ((_numPag - 1) * _topFilas);
                var topNext = (_numPag + 1) * _topFilas;
                for (var i = inicio; i <= data.NumRegistros && i <= (_numPag * _topFilas); i++) {
                    addRow(data[i], i);
                }
                
                if (fnCalculos) {
                    for (var i = 1; i <= data.NumRegistros; i++) {
                        fnCalculos(data[i]);
                    }
                }
                
                if (_numeroPaginas == _numPag) {
                    $("#f3").hide();
                    $("#f4").hide();
                }
                else {
                    $("#f3").show();
                    $("#f4").show();
                }
                /*
                if (_numPag > 1 &&
                (!_obtenidosTodos) &&
                _haciaAlante &&
                (data.NumRegistros > (_numPag * _topFilas))) {
                    _listado.ObtenerRegistros(ObtenerSql());
                //ObtenerRegistros(_sql, function(data) { _datos = data; });
                }
                */

                _tdNumeroPagina.html("&nbsp;Página " + _numPag + " de " + _numeroPaginas + ". Total <b>" + data.NumRegistros + "</b> registros");
                //_tdNumeroPagina.append("         Página " + _numPag + " de " + _numeroPaginas);
            }
            else {
        
                for (var i = 0; i < data.NumRegistros; i++) {
                    
                    addRow(data[i]);
                    
                    if (fnCalculos) {
                        fnCalculos(data[i]);
                    }
                }
            }

            parent.append(_tableDatos);

        }

        if (fnEnd) fnEnd();

        ccb.feedBack.endLoading();

        recargarIconosOrden();
    }

    function recargarIconosOrden() {
        if (_arrayOrder.length < 0) return;

        $(".spanOrden").removeClass("ui-icon ui-icon-triangle-1-n");
        $(".spanOrden").removeClass("ui-icon ui-icon-triangle-1-s");
        
        var iconSpan;
        //$.each(_arrayOrder,
        //    function(index, value) {
        
                var value = _arrayOrder[0];
                if (value.replace(" DESC", "") == value) {
                    iconSpan = $("#icon_" + value);
                    iconSpan.removeClass("ui-icon ui-icon-triangle-1-n");
                    iconSpan.addClass("ui-icon ui-icon-triangle-1-s");
                    //iconSpan.addClass("ui-icon");                    
                }
                else {
                    iconSpan = $("#icon_" + value.replace(" DESC", ""));
                    iconSpan.removeClass("ui-icon ui-icon-triangle-1-s");
                    iconSpan.addClass("ui-icon ui-icon-triangle-1-n");
                }
            //}        );
    }

    var clase = "";
    function addRow(row) {
        if (clase == "dato") {
            clase = "datoImpar";
        }
        else {
            clase = "dato";
        }

        var tr = $('<tr>'); //Id ="' + row.Id + '"
        //tr.attr('Id', row.Id);

        for (col in _cols) {
            addCol(tr, clase, _cols[col], row);
            //tdCabecera.css("width", cols[col].width);
        }

        if (_fnEliminar) {
            var img = $('<img title="Eliminar" src="' + rutaEliminar + '" style="cursor:hand" >');
            img.click(
                    function() {
                        _fnEliminar(row);
                    }
                   );
            var td2 = $("<td>");
            td2.append(img);
            td2.addClass(clase);
            td2.css('text-align', 'center');
            td2.css('width', 27);
            tr.append(td2);
        }
        
        tr.hover(function() {
        $(this).addClass('selected');
        }, function() {
        $(this).removeClass('selected');
        });
		
        _tableDatos.append(tr);
        
        //if (fnCalculos) fnCalculos(row);
    }

    // TABLAS
    function vaciarTabla() {
        clase = "";
        _tableDatos.css("width", "");
        $('#' + _tablaId + ' tr').each(function() {
            $(this).remove();
        });
    }

    function addTdDate(tr, clase, valor) {
        var td = $('<td>');
        td.addClass(clase);

        if (valor != "" && valor != null) {
            var dia = valor.getDate();
            dia = "0" + dia;
            dia = dia.substring(dia.length - 2, dia.length);

            var mes = valor.getMonth() + 1;
            mes = "0" + mes;
            mes = mes.substring(mes.length - 2, mes.length);

            var anyo = valor.getFullYear();

            td.text(dia + "/" + mes + "/" + anyo);

            td.css("text-align", "center");
        }

        tr.append(td);
        return td;
    }


    function addTdShy(tr, clase, valor) {
        var tdShy = addTd(tr, clase, "").css('word-wrap', 'break-word');
        tdShy.html(insertShy(valor));
        return tdShy;
    }
    
    function addCol(tr, clase, col, row) {

        var td;

        switch (col.tipo) {
            case 'shy':
                td = addTdShy(tr, clase, row[col.campo]);
                td.css('text-align', 'left');
                break;
            case 'date':
                td = addTdDate(tr, clase, row[col.campo]);
                td.css('text-align', 'center');
                break;
            case 'detalle':
                td = addTdDetalle(tr, clase, row);
                break;                
            case 'linkPassRow':
                td = addTdLinkPassRow(tr, clase, row[col.campo], row, col.enlace);
                td.attr("title", row[col.title]);
                break;  
            case 'link':
                td = addTdLink(tr, clase, row[col.campo], col.enlace);
                td.attr("title", row[col.title]);      
                break;                
            case 'text':
                td = addTd(tr, clase, row[col.campo]);
                td.css('text-align', 'left');
                break;
            case 'code':
                if (col.codes) {
                    td = addTd(tr, clase, col.codes[row[col.campo]]);
                }
                else {
                    td = addTd(tr, clase, row[col.campo]);
                }
                td.css('text-align', 'center');
                break;                
            case 'number':
                td = addTd(tr, clase, FormatearNumero2(row[col.campo], 0));
                //td = addTd(tr, clase, row[col.campo]);
                td.css('text-align', 'right');
                break;
            case 'euros':
                td = addTdEuros(tr, clase, row[col.campo]);
                td.css('text-align', 'right');
                break;
            case "addTdMyFuncion":
                td = col.addTdMyFunction(tr, clase, row);
                //td.css('text-align', 'right');
                break;
            case 'calculada':
                var calculado = col.fnCalcularListado(row);
                td = addTd(tr, clase, calculado);
                td.css('text-align', 'right');
                break;
            case 'check':
                td = addTdCheck(tr, clase, col, row );
                td.css('text-align', 'center');
                break;
			case 'SelectCheck':
                td = addTdSelectCheck(tr, clase, col, row );
                td.css('text-align', 'center');
                break;				
            case 'SINO':
                td = addTd(tr, clase, row[col.campo]?"Sí":"No");
                td.css('text-align', 'center');
                break;
            default:
                td = $('<td>');
                //td.css("width", col.width);
                td.addClass(clase);
                //tr.append(td);
        }

        if (col.ajustarScroll) {
            td.css("width", col.width - 25);
        }
        else {
            td.css("width", col.width + _incrementoWidth);
        }

        if (col.classParam) {
            td.addClass(col.classParam);
        }

        if (col.align) {
            td.css("text-align", col.align);
        }        
    }    

    function addTdDetalle(tr, clase, row)
    {
        var td1 = $('<td>');
        td1.css('text-align', 'center');
        td1.addClass(clase);

        var a = $('<a>').attr('title', 'ir al detalle...');
        //a.attr("Id", valor);

        a.click(function() {
            irDetalle(row);
        });

        a.attr("href", "#");

        var img = $('<img>');
        img.attr('src', '../../images/Flecha_AV.gif');
        img.attr('border', '0');
        a.append(img);
        td1.append(a);
        tr.append(td1);

        return td1;
    }

    function addTdCheck(tr, clase, col, row) {
        var td1 = $('<td>');
        td1.addClass(clase);

        var check = $('<input type="checkbox" />');

        check.attr("checked", row[col.campo]);

        check.change(
            function() {
                col.onChange(row[_key[0]], check.is(":checked"));
            }
        );

        td1.append(check);
        
        tr.append(td1);
        return td1;
    }
	
	function addTdSelectCheck(tr, clase, col, row) {
        var td1 = $('<td>');
        td1.addClass(clase);

        var check = $('<input type="checkbox" class="SelectCheck" />');

		if(col.checked)
		{
			check.attr("checked", "true");
		}
		
		check.attr("Id", row["Id"]);
		
        td1.append(check);
        
        tr.append(td1);
        return td1;
    }
        
    function addTdLink(tr, clase, campo, enlace) {
        var aTxt = "";
        if (campo) {
            enlace = enlace.split("{")[0] + campo + enlace.split("}")[1];
            aTxt = '<a href="' + enlace + '">' + campo + '</a>'; //.attr('title', 'ir al detalle...');
        }

        var td1Txt = '<td class="' + clase + '" style="text-align:center">' + aTxt + '</td>';
        return $(td1Txt).appendTo(tr);
    }

    function addTdLinkPassRow(tr, clase, campo, row, enlace) {
        var aTxt = "";
        if (campo) {
            //td1.css('text-align', 'center');

            //a.text(campo)

            enlace = enlace + "?" + $.param(row);
            aTxt = '<a href="' + enlace + '">' + campo + '</a>'; //.attr('title', 'ir al detalle...');

            //a.attr("href", enlace);

            //td1.append(a);
        }

        var td1Txt = '<td class="' + clase + '" style="text-align:center">' + aTxt + '</td>';
        return $(td1Txt).appendTo(tr);
        
    /*
        var td1 = $('<td>');
        td1.addClass(clase);

        if (campo) {
            td1.css('text-align', 'center');
            var a = $('<a>'); //.attr('title', 'ir al detalle...');
            a.text(campo)

            enlace = enlace + "?" + $.param(row);
            a.attr("href", enlace);
            td1.append(a);
        }

        tr.append(td1);
        return td1;
        */
    }
    

    function addTdEuros(tr, clase, valor) {
        var td = $('<td>');
        td.addClass(clase);
        if (valor != null) {
            td.html(importeEuros(valor));
        }
        else {
            td.html(importeEuros(0));
        }
        tr.append(td);

        td.css("text-align", "right");
        return td;
    }

    function addTd(tr, clase, valor) {
        var texto = valor != null ? valor : "";
        //var td =
        return $('<td class="' + clase + '">' + texto + '</td>').appendTo(tr);
        /*
        td.addClass(clase);
        if (valor != null) {
            td.text(valor);
        }
        */
        //tr.append(td);
        //return td;
    }

    function insertShy(texto) {
        if (texto == null || texto.length == 0) {
            return "";
        }

        var s = "";

        while (texto.length != 0) {
            s = s + texto.substring(0, 1) + "&shy;";
            texto = texto.substring(1, texto.length);
        }

        return s;
    }
}



/*
var sqlTop = " TOP " + (((_numPag + 1) * _topFilas) + 1);
*/
    



		