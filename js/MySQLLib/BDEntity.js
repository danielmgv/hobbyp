
function BDEntity(tableName)
{
	this.InsertProc =  tableName + "Insert";
	this.DeleteProc = tableName + "Delete";
	
	function Insert(params)
	{
		AsyncCallProcedure(getSqlProcedure(this.InsertProc, params), eval(this.InsertProc + "OK"), eval(this.InsertProc + "NOK"));
	}
	
	function Delete(params)
	{
		AsyncCallProcedure(getSqlProcedure(this.DeleteProc, params), eval(this.DeleteProc + "OK"), eval(this.DeleteProc + "NOK"));
	}
	
	function Procedure(procedureName, params)
	{
		AsyncCallProcedure(getSqlProcedure(procedureName, params), eval(procedureName + "OK"), eval(procedureName + "NOK"));
	}
}


