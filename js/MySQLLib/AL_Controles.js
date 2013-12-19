
function AL_ControlInsert(params)
{
	var sqlProcedure = 'ControlInsert("' + params.Nombre + '", ' + params.Materia + ', "' + params.Evaluacion + '")';
	AsyncCallProcedureScalar(sqlProcedure, params.fnOK, params.fnNOK);	
}