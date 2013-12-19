
$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	$("#btnAceptar").bind("tap", submitFile);
}

function submitFile()
{
	//alert((JSON.stringify(ALDocumento)));
	//$("#IdPeople").val();
	//$("#NombreOriginal").val(ALDocumento.NombreOriginal);
	//$("#NuevoNombre").val(ALDocumento.IdAlumno + "_" + ALDocumento.Id + ".dat");
	//$("#Ruta").val(ALDocumento.Ruta);
	//$("#Texto").val(ALDocumento.NombreOriginal);
	$("#formSubirFoto").submit();
}
