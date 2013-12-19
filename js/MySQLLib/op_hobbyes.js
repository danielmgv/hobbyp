
var Insert = "op_hobbyesInsert";
var DeleteProc = "op_hobbyesDelete";
var SendMenssage = "op_hobbyesSendMenssage";

function op_hobbyesInsert(params)
{
	var sqlProcedure = Insert + '("' + params.IdPeople + '", ' + params.IdHobbie + ', "' + params.Like + '")';
	AsyncCallProcedure(sqlProcedure, params.fnOK, params.fnNOK);
}

function op_hobbyesDelete(params)
{
	var sqlProcedure = DeleteProc + '("' + params.IdPeople + '", "' + params.IdHobbie + '")';
	AsyncCallProcedure(sqlProcedure, params.fnOK, params.fnNOK);
}

function op_hobbyesSendMenssage(params)
{
	var sqlProcedure = SendMenssage + '("' + params.IdPeople + '", "' + params.IdHobbie + '")';
	AsyncCallProcedureScalar(sqlProcedure, params.fnOK, params.fnNOK);
}


