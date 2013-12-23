
function BDEntity(tableName)
{
	this.tableName = tableName;
	this.InsertProc =  tableName + "Insert";
	this.DeleteProc = tableName + "Delete";
	
	this.Insert = function (params)
	{
		try{
			var fnOK = eval(this.InsertProc + "OK");
			var fnNOK = eval(this.InsertProc + "NOK");	
		}
		catch(any)
		{	
			alert(any);
		}
		AsyncCallProcedure(getSqlProcedure(this.InsertProc, params), fnOK, fnNOK);
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
			alert(any);
		}

		
		AsyncCallProcedure(getSqlProcedure(procedureName, params), fnOK, fnNOK);
	};
}


