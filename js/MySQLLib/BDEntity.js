//*************************************************************************************************************************************************************
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

//*************************************************************************************************************************************************************
var op_hobbyes = {
    MeBDEntity: new BDEntity("op_hobbyes"),
    KeyField: { IdPeople: null, IdHobbie: null},
    Fields:
		{
		    IdPeople: "",
		    IdHobbie: null,
		    Like: true
		},
    Insert: function() { this.MeBDEntity.Insert(this.Fields); },
    Delete: function() { this.MeBDEntity.Delete(this.KeyField); }
};

//*************************************************************************************************************************************************************
var ohoobyes = {
    MeBDEntity: new BDEntity("ohoobyes"),
    KeyField: { Id: null},
    Fields:
		{
		    Name: "",
			IdParent: null,
			Description: ""
		},
    Insert: function() { this.MeBDEntity.Insert(this.Fields); },
    Delete: function() { this.MeBDEntity.Delete(this.KeyField); }
};

//*************************************************************************************************************************************************************
var opeople = {
    MeBDEntity: new BDEntity("opeople"),
    KeyField: { Id: null},
    AutoIndex: true,
    Fields:
		{
		    Name: "",
		    Email: "",
		    Password: "",
		    ObservacionesHobbies: "",
	    	Photo: "",
			Country: "",
			City: "",
			Gender: "",
			Age: "",		
			Phone: ""
		},
    Insert: function() { this.MeBDEntity.Insert(this.Fields, this.AutoIndex); },
    Delete: function() { this.MeBDEntity.Delete(this.KeyField); },
    Procedure: function(procedureName, params) { this.MeBDEntity.Procedure(procedureName, params); },
    GetByKey: function() { this.MeBDEntity.GetByKey(this.KeyField); }
};

//*************************************************************************************************************************************************************
var oNews = {
    MeBDEntity: new BDEntity("oNews"),
    KeyField: { Id: null},
    AutoIndex: true,
    Fields:
		{
			IdPeople: null,
		    IdHobbie: null,
		    Title: "",
		    Content: "",
		    ImgFileName: "",
		    FAlta: new Date(),
		    Privacity: null
		},
    Insert: function() { this.MeBDEntity.Insert(this.Fields, this.AutoIndex); },
    Delete: function() { this.MeBDEntity.Delete(this.KeyField); },
    Procedure: function(procedureName, params) { this.MeBDEntity.Procedure(procedureName, params); },
    GetByKey: function() { this.MeBDEntity.GetByKey(this.KeyField); }
};



//*************************************************************************************************************************************************************
//*************************************************************************************************************************************************************
function BDEntity(tableName)
{
	this.tableName = tableName;
	this.InsertProc =  tableName + "Insert";
	this.DeleteProc = tableName + "Delete";
	
	this.Insert = function (params, AutoIndex)
	{	
		this.Procedure(this.InsertProc, params, AutoIndex);	
	};	
		
	this.Delete = function (params)
	{
		this.Procedure(this.DeleteProc, params);
	};	
	
	this.Procedure = function (procedureName, params, scalar)
	{
		var fnOK = window[procedureName + "OK"];
		var fnNOK = window[procedureName + "NOK"];
		
		if (!(typeof(fnOK) === "function")) { 
    		fnOK = function(data){};
		}
		
		if (!(typeof(fnNOK) === "function")) { 
    		fnNOK = genericNOK;
		}
				
		if(scalar)
			AsyncCallProcedureScalar(getSqlProcedure(procedureName, params), fnOK, fnNOK);
		else		
			AsyncCallProcedure(getSqlProcedure(procedureName, params), fnOK, fnNOK);
	};	
	
	this.GetByKey = function (KeyField)
	{
		var fnOK = eval(tableName + "GetByKeyOK");
		var fnNOK = eval(tableName + "GetByKeyNOK");		
		var SQL = "SELECT * FROM " + this.tableName + " WHERE " + Conditions(KeyField);	
		AsyncConsultaSELECT({SQL: SQL}, fnOK, fnNOK);
	};
	
}

//**********************************************************************************************************************************************************************
function genericNOK(httpRequest, textStatus, errorThrown) {
	//$.mobile.loading( 'hide' );
	if(httpRequest.status = 500)
	{
		try{
			var errorJson = eval(httpRequest.responseText);
			showError(errorJson.Error);
		}
		catch(any){
			showError(httpRequest.responseText);		
		}	
	}
	else
	{
		showError(textStatus + errorThrown.message);	
	}
}

//**********************************************************************************************************************************************************************

function Conditions(KeyField)
{
	var sql = "";
	for (var key in KeyField) {
	  if (KeyField.hasOwnProperty(key)) {
	  	  switch (Object.prototype.toString.call(KeyField[key])) {
		    case "[object String]":
		  		sql += key + " = '" + KeyField[key] + "'";
		  		break;
			case '[object Number]':
		  		sql += key + " = " + KeyField[key];
		  		break;
			case "[object Null]":
		  		sql += key + " = " + "Null" ;
		  		break;		  		
			case '[object Date]':
			  	sql += key + " = " + "'" + KeyField[key].toMysqlFormat()  + "'";
		  		break;
			case '[object Boolean]':
		  		sql += key + " = " + KeyField[key];
		  		break;
			case 'undefined':
		  		//serializeArr.push( "'" + Fields[key] + "'" );
		  		break;	  			
			default:
		  		sql += key + " = " + "Null";
		  		break;
			}
			sql += " AND ";
		}
		sql = sql.substring(0, sql.length - 4);
	}
	return sql;
}

