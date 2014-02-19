
var	oMessages = {
		MeBDEntity: new BDEntity("oMessages"),
		KeyField: {Id:null},	
		Fields:
		{
			Asunto: "",			
			IdOrigen: null,
		    Fecha: new Date(),
			Mensaje: null,
			De: null,
			Para: null	
		},
		Insert : function(){this.MeBDEntity.Insert(this.Fields);},
		Delete : function(){this.MeBDEntity.Delete(this.KeyField);}
};

var op_hobbyes = {
    MeBDEntity: new BDEntity("op_hobbyes"),
    KeyField: { IdHobbie: null, IdPeople: null},
    Fields:
		{
		    IdPeople: "",
		    IdHobbie: null,
		    Like: true
		},
    Insert: function() { this.MeBDEntity.Insert(this.Fields); },
    Delete: function() { this.MeBDEntity.Delete(this.KeyField); }
};

var ohoobyes = {
    MeBDEntity: new BDEntity("ohoobyes"),
    KeyField: { Id: null},
    Fields:
		{
		    Name: ""
		},
    Insert: function() { this.MeBDEntity.Insert(this.Fields); },
    Delete: function() { this.MeBDEntity.Delete(this.KeyField); }
};

var opeople = {
    MeBDEntity: new BDEntity("opeople"),
    KeyField: { Id: null},
    Fields:
		{
		    Name: "",
		    Email: "",
		    Password: ""
		},
    Insert: function() { this.MeBDEntity.Insert(this.Fields); },
    Delete: function() { this.MeBDEntity.Delete(this.KeyField); },
	GetByKey: function() { this.MeBDEntity.GetByKey(this.KeyField); }  
};




//****************************************************************************************************************************
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
	
	this.GetByKey = function (keys)
	{
		AsyncConsultaSELECT({SQL:GetByKeySQL(tableName, keys)}, eval(tableName + "GetByKey" + "OK"), eval(tableName + "GetByKey" + "NOK"));
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
//**********************************************************************************************************************************************************************

function  GetByKeySQL (tableName, keys) {
	  var sql = "SELECT * FROM " + tableName + " WHERE ";
	  for(var key in keys)
	  {
	  		sql += key + "=" + key;	  	
	  }
	  
	  return sql;
}
