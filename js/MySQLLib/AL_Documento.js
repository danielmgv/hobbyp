
var Insert = "DocumentoInsert";

function AL_DocumentoInsert(params)
{
	var sqlProcedure = Insert + '("' + params.Ruta + '", ' + params.AlumnoId + ', "' + params.NombreOriginal + '")';
	AsyncCallProcedureScalar(sqlProcedure, params.fnOK, params.fnNOK);	
}