
$(document).bind('pageinit', function(){	pageinit();	});

function pageinit(){
	
}




function submitFile(ALDocumento)
{
	//alert((JSON.stringify(ALDocumento)));
	$("#IdPeople").val(ALDocumento.IdAlumno);
	//$("#NombreOriginal").val(ALDocumento.NombreOriginal);
	//$("#NuevoNombre").val(ALDocumento.IdAlumno + "_" + ALDocumento.Id + ".dat");
	//$("#Ruta").val(ALDocumento.Ruta);
	//$("#Texto").val(ALDocumento.NombreOriginal);
	$("#formSubirFoto").submit();
}
