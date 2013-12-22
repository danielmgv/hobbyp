
function BDEntity(tableName)
{
	var InsertProc =  tableName + "Insert";
	var DeleteProc = tableName + "Delete";
	
	this.Insert = function (params)
	{
		AsyncCallProcedure(getSqlProcedure(this.InsertProc, params), eval(this.InsertProc + "OK"), eval(this.InsertProc + "NOK"));
	};
	
	this.Delete = function (params)
	{
		AsyncCallProcedure(getSqlProcedure(this.DeleteProc, params), eval(this.DeleteProc + "OK"), eval(this.DeleteProc + "NOK"));
	};  
	
	this.Procedure = function (procedureName, params)
	{
		try{
			var fnOK = eval(procedureName + "OK");
			var fnNOK = eval(procedureName + "NOK");	
		}
		catch(any)
		{	
			alert("Err0r eval");
		}

		
		AsyncCallProcedure(getSqlProcedure(procedureName, params), fnOK, fnNOK);
	};
}


