
var CONS_RUTA = "../Data/";

$(document).ready(documentReady);
//$(document).unload(documentUnload);
    
    var listado;    
    
    function documentReady() {	
		
        $(".boton").button();

        $("input.fecha").each(function() {
            convertDatePicker($(this));
        });
        
		var cols = [		
            {
                width: 120,
                campoOrden: 'Fecha',
                campo: 'Fecha',
                tipo: 'date',
                texto: 'Fecha',
                orderByDef: true
            },
			{
                width: 300,
                campoOrden: 'Observaciones',
                campo: 'Observaciones',
                tipo: 'text',
                texto: 'Observaciones',
                orderByDef: true
            }
            
        ];

        var params = {
            cols: cols,
            fnEliminar: Eliminar,
			botttonAdd: true,
            obtenerSql: ObtenerSql // función que devuelve sql de consulta según los filtros aplicados
        };

        listado = $("#tablaConCabecera").Listado(params);

        //listado.Consultar();        
    }

    function ExportarExcel() {
        $("a").each(
            function() {
                $(this).attr('oldhref', $(this).attr('href'));
            }
        );

        $("a").removeAttr('href');
        var tablaHtml = $("#tablaConCabecera").html();
        $("#datosTabla").val(replaceAll(tablaHtml, "€", ""));

        $("a").each(
        function() {
            $(this).attr('href', $(this).attr('oldhref'));
        });
        $(document.all.formExcel).submit();
    }

    function ObtenerSql() {
    
		var sqlCampos = " * ";	
		
        var sqlFrom = " FROM Observaciones O ";
              
        var sqlWhere = " where O.IdAlumno = " + parent.fromServer.Alumno.Id;        

        var sql = " SELECT " + sqlCampos + sqlFrom + sqlWhere;
        return sql;
    }



function resetform() {
    var obj = document.all.form1;
    var i;
    for (i = (obj.all.length - 1); i >= 0; i--) {
        if (obj.all[i].type == "text") {
            obj.all[i].value = "";
            if (obj.all[i].antvalue != null) {
                obj.all[i].antvalue = "";
            }
        }
        if (obj.all[i].type == "select-one") {
            obj.all[i].options[0].selected = true;
            obj.all[i].fireEvent("onChange");
        }
        if (obj.all[i].type == "checkbox") {
            obj.all[i].checked = false;
            obj.all[i].fireEvent("onClick");
        }
    }
}

function imprimir() {
    var frm = document.getElementById("aa");
    var params = ObtenerParams();
    frm.src = frm.getAttribute("pagina") + "&" + $.param(params);
}

//***************************************************


function Eliminar(row)
{	
	if(confirm("¿Desea borrar la observacion?"))
	{
		ccb.feedBack.loading();
		var sqlProcedure;

		sqlProcedure = 'ObservacionDelete';
		var params = row.Id;

		AsyncCallProcedure(sqlProcedure + "(" + params + ")", EliminarOK, EliminarNOK);
	}
}

function EliminarOK(data) {
	
	ccb.feedBack.endLoading();
	
	if(!hayError(data))
	{	
		//$alert("Alumno borrado");
		custom_alert("Observación borrada");
		listado.Consultar();
	}
}

//900901300
function EliminarNOK(httpRequest, textStatus, errorThrown) {
	ccb.feedBack.endLoading();
	$alert("Error al borrar.\n" + textStatus + errorThrown.message);	
}











