	/**
* @name : 
* @classDescription :
* @version : 0.1.1
* @author : 
* @copyright : 
* 
* Depends:
*  - jQuery v1.7.1 (<root>/include/jquery.js)
*  - jQuery UI 1.8.17 (<root>/include/jquery-ui.js)
*/
var ccb = { NAME : 'ccb', VERSION : '0.1.1' };
(function (jQuery) {

	this.jQuery = jQuery;

	// Aviso si 'jQuery' no esta definido
	if (this.jQuery == undefined)
		alert(this.NAME + ' ' + 'v' + this.VERSION + '.\n\t jQuery is not defined');

	this.isDefinedJQ = function (){
		return this.jQuery == undefined ? false : true;
	};

}).call(ccb, typeof jQuery == 'undefined' ? undefined : jQuery);


/**
 * 
 */
ccb.fncs = {NAME : 'ccb.fncs', VERSION : '0.1.1'};
(function (parent){

	var jQ = parent.jQuery;
	this.isDefined = function (){
		return parent.isDefinedJQ();
	};
	/**
	 * 
	 * @param {String} texto
	 * @de
	 */
	this.lTrim = function (texto) {
		if (typeof texto == 'string')
			return texto.replace(/^\s+/, '');
		return '';
	};
	/**
	 * 
	 * @param {String} texto
	 */
	this.rTrim = function (texto) {
		if (typeof texto == 'string')
			return texto.replace(/\s+$/, '');
		return '';
	};
	/**
	 * 
	 * @param {String} texto
	 */
	this.trim = function (texto){
		if (typeof texto == 'string')
			return this.lTrim(this.rTrim(texto));
		return '';
	};
	
	// Funcion que cambia el "." por "," (usarla en el onkeypress de un input-text.)
	// Sólo funciona con IE.
	this.ponerComa = function (e, control) {		
	
		if (navigator.appName == "Microsoft Internet Explorer") {
			var tecla = window.event.keyCode;
			if (tecla == 46 || tecla == 44) {
				if (control.value.indexOf(",") != -1 )
					event.keyCode = 0;
				else
					event.keyCode = 44;
			}
		}		
		
	};
	
	this.getSelectionStart = function(o) {
		if (o.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveEnd('character', o.value.length);
			if (r.text == '') return o.value.length;
			return o.value.lastIndexOf(r.text);
		} else return o.selectionStart;
	};
	
	this.getSelectionEnd = function(o) {
		if (o.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveStart('character', -o.value.length);
			return r.text.length;
		} else return o.selectionEnd;
	}; 
	
	
	
	this.searchUnicode = function(codigo, cadena)
	{
		if (cadena.search(String.fromCharCode(codigo)) == -1){
			return false;
		}else{
			return true;
		}
	};

}).call(ccb.fncs, ccb);

/**
 *
 */
ccb.feedBack = {NAME : 'ccb.feedBack', VERSION : '0.1.1'};
(function (parent){

	var jQ = parent.jQuery, 
	divMsg = jQ('#dialog_err'), msgs = [], 
	$divLoading = jQ('#ccb_loading');
		
	if (divMsg.get().length == 0){
	
		jQ(function (){
		
			divMsg = jQ('<div id="dialog_err" title=""></div>');
			
			divMsg
				.dialog({
					autoOpen: false,
					show: "blind",
					hide: "blind",
					buttons: {
						"Cerrar": function() {
							jQ(this).dialog("close");
						}
					}
				});		
		});		
	}
	
	/**
	 *
	 */
	this.addMsg = function (){
		if(arguments.length > 0){
		
			// Texto del mensaje
			var msg = arguments[0];
			
			for(var i = 1 ; i < arguments.length ; i++){
				msg = msg.replace(new RegExp("\\$" + i, "g"), arguments[i]);
			}
			msgs.push(msg);
		}
	};
	
	/**
	 *
	 */
	this.clearMsg = function (){
		msgs = [];		
	};
	
	/**
	 *
	 */
	this.viewMsg = function (){
	
		var title = "";
		var b = false;
		if (arguments.length > 0){
			title = typeof arguments[0] == 'string' ? arguments[0] : "";
		}
	
		if (msgs.length > 0){
			divMsg.html('');
			for (var i in msgs){
				divMsg.append( "<p>" + msgs[i] + "</p>" );
			}
			divMsg.dialog("option", "title", title);
			divMsg.dialog('open');
			
			// Dialogo mostrado
			b = true;
		}
		
		this.clearMsg();
		
		return b;
	};
	
	this.loading = function(){
		
		var title = 'Espere, por favor';
		if (arguments.length > 0){
			title = typeof arguments[0] == 'string' ? arguments[0] : title;
		}
		
		if($divLoading.get().length == 0){
			$divLoading = jQ('<div id="ccb_loading" class="ccb-Loading" title=""><div>' +
							'<span>' + title + '</span>' + 
							'</div></div>'
							);
			$divLoading.appendTo('body');
		}else{
			$('span', $divLoading).html(title);
		}
		
		$divLoading.removeClass('hidden');
	};
	this.endLoading = function(){
		if($divLoading.get().length > 0){
			$divLoading.addClass('hidden');
		}
	};

}).call(ccb.feedBack, ccb);


/**
 *
 */
ccb.html = {NAME : 'ccb.html', VERSION : '0.1.1'};
(function (parent){

	var jQ = parent.jQuery;

	/**
	 * 
	 * @param {Object} data
	 * @param {Object} selected
	 */
	this.fAddOptions = function (data, selected){
		
		var $sel = this;
		var numEltos = data['numregistros'];
		var opt;
		
		// Añadir opción vacia
		$sel.append('<option value=""></option>');			
		for (var i = 1; i <= numEltos; i++) {
			// Crear 'option'
			opt = '<option value="' + data[i]['value'] + '" ' +	((data[i]['value'] == selected) ? 'selected="selected" ' : '');
			// Si existen más columnas en el data que no son las tipificadas por defecto se añaden como atributos del option
			for (var j in data[i]){
				if(!new RegExp(':'+j+':', 'gi').test(':value:text:')){
					opt += j +'="' + data[i][j] +'"';
				}			
			}
			opt += '>' + data[i]['text'] + '</option>';		
			$sel.append(opt);
		}
	};
	
	/**
	 * 
	 * @param {Object} idFrm
	 */
	this.fVaciarFrm = function (idFrm){
	
		idFrm = idFrm.replace(/#/g,'');
	
		// Vaciar formulario de posibles valores o selecciones
		jQ(':input:not(:checkbox):not(.hidden)', '#'+idFrm).val('');
		jQ(':checkbox', idFrm).attr('checked', false);
	};
	
	/**
	 * 
	 * @param {Object} o : {filter : '', cssL : '', cssD : ''}
	 */ 
	this.fZebra = function (){
		
		var o = undefined;
		if (arguments.length > 0){
			o = arguments[0];
			// Si el Objecto es del tipo necesitado
			if(typeof o === 'object' && 'filter' in o && 'cssL' in o && 'cssD' in o){
				}else{
				return ;
			}
		}
		
		$(o.filter).removeClass(o.cssL + ' ' + o.cssD);		
		$(o.filter).addClass(o.cssL);
		$(o.filter + ':even').addClass(o.cssD);
	};
	
}).call(ccb.html, ccb);

/**
 * 
 */ 
ccb.resources = { NAME : 'ccb.obtener', VERSION : '0.1' };
(function(parent){
	//// IE7 NO funciona
	//this.img_loading = "data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA";
	this.img_loading = '';
}).call(ccb.resources, ccb);


/**
 *
 */
ccb.obtener = { NAME : 'ccb.obtener', VERSION : '2.0' };
(function(parent){
	
	/**
	 * Obtiene una fecha de una cadena con formato "DD/MM/AAAA".
	 * Devuelve NULL si no es una fecha o si no tiene el formato correcto.
	 * @param {Object} texto
	 */
	this.fecha = function (texto) {
		var d, m, a, i, j, v;
		// Se asegura de obtener un texto
		if (texto == null || texto == "") {
			return null;
		}
		else if (texto instanceof Date) {
			texto = parent.formatear.hora(texto);
		}
		else if (typeof(texto) != "string") {
			texto = String(texto);
		}
		// Trocea la cadena.
		texto = texto.replace(/-/g, "/");
		v = texto.split("/");
		// Si no tiene 3 trozos (0, 1 y 2), prueba con otro separador.
		if (v.length != 3) {
			v = texto.split("-");
		}
		// Otro separador (añadido el 08/03/2005).
		if (v.length != 3) {
			v = texto.split(".");
		}
		// Si no tiene 3 trozos (0, 1 y 2), devuelve nulo.
		if (v.length != 3) {
			return null;
		}
		// Obtiene día, mes y año.
		d = v[0];
		m = v[1];
		a = v[2];
		// Valida el año.
		if (a == "" || isNaN(a)) {
			return null;
		}
		a = this.numero(a);
		// ¿Sólo dos cifras?
		if (a < 100) {
			// Considera años de 1930 a 2029.
			a += (a >= 30) ? 1900 : 2000;
		}
		// Valida el mes.
		if (m == "" || isNaN(m)) {
			return null;
		}
		m = this.numero(m);
		if (m < 1 || m > 12) {
			return null;
		}
		// Valida el día.
		if (d == "" || isNaN(d)) {
			return null;
		}
		d = this.numero(d);
		// Días que tiene cada mes.
		var dias;
		dias = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if (a % 4 == 0) {
			// Si es año bisiesto, cambia los días de febrero.
			dias[1] = 29;
		}
		if (d < 1 || d > dias[m - 1]) {
			// El número de día no es válido.
			return null;
		}
		// Ok. Fecha válida.
		return new Date(a, m - 1, d);
	};

	/**
	 * Obtiene una fecha de una cadena con formato "HH:MM:SS".
	 * Devuelve NULL si no es una fecha o si no tiene el formato correcto.
	 * @param {Object} texto
	 */
	this.hora = function (texto) {
		var v;
		// Se asegura de obtener un texto
		if (texto == null || texto == "") {
			return null;
		}
		if (texto instanceof Date) {
			texto = parent.formatear.hora(texto);
		}
		else if (typeof(texto) != "string") {
			texto = String(texto);
		}
		// Trocea la cadena.
		v = texto.split(":");
		if (v.length < 1 || v.length > 3)
			return null;
		// Obtiene la hora.
		var h, m, s;
		h = v[0];
		// Obtiene el minuto.
		m = (v.length >= 2) ? v[1] : "0";
		
		// Obtiene el segundo.
		s = (v.length >= 3) ? v[2] : "0";
		
		// Valida la hora
		if (h == "" || isNaN(h)) {
			return null;
		}
		h = this.numero(h);
		if (h < 0 || h >= 24)
			return null;
		// Valida el minuto
		if (m == "" || isNaN(m)) {
			return null;
		}
		m = this.numero(m);
		if (m < 0 || m >= 60)
			return null;
		// Valida el segundo
		if (s == "" || isNaN(s)) {
			return null;
		}
		s = this.numero(s);
		if (s < 0 || s >= 60)
			return null;
		// Ok. Devuelve la hora.
		return new Date(1899, 12, 30, h, m, s);
	};

	/**
	 * Obtiene fecha y hora de una cadena con formato "DD/MM/AAAA HH:MM:SS".
	 * Devuelve NULL si no es una fecha o si no tiene el formato correcto.
	 * @param {Object} texto
	 */
	this.fechaHora = function (texto) {
		var v;
		// Se asegura de obtener un texto
		if (texto == null || texto == "") {
			return null;
		}
		if (texto instanceof Date) {
			texto = parent.formatear.hora(texto);
		}
		else if (typeof(texto) != "string") {
			texto = String(texto);
		}
		// Trocea la cadena.
		texto = texto.replace(/ +/g, " ");
		v = texto.split(" ");
		if (v.length < 1 || v.length > 2)
			return null;
		// Obtiene la fecha
		var f, h;
		f = this.fecha(v[0]);
		if (f == null)
			return null;
		// Obtiene la hora,
		if (v.length > 1) {
			h = this.hora(v[1]);
			if (h == null)
				return null;
			f = new Date(f.getFullYear(), f.getMonth(), f.getDate(), h.getHours(), h.getMinutes(), h.getSeconds());
		}
		// devuelve la fecha.
		return f;
	};
	
	/**
	 * Obtiene un número a partir de una cadena con formato "5.167,45".
	 * Devuelve NULL si no es un número válido.
	 * @param {Object} txt
	 */
	this.numero = function (txt) {
		if (typeof(txt) == "number") {
			return txt;
		}
		var x = "" + txt;
		x = x.replace(/\./g, "");
		x = x.replace(/,/g, ".");
		if (x == "" || isNaN(x)) {
			return null;
		}
		else {
			while (x.length > 1 && x.charAt(0) == '0') {
				x = x.substring(1);
			}
			if (x.indexOf(".") != -1)
				return parseFloat(x);
			else
				return parseInt(x);
		}
	};
	
	/**
	 * Función para obtener un booleano a partir de una cadena de texto.
	 * @param {Object} texto
	 */
	this.boolenano = function (texto) {
		if (texto == null || texto == "") {
			return false;
		}
		if (typeof(texto) != "string") {
			texto = parent.formatear.booleano(texto);
		}
		if (texto.toUpperCase() != "NO" && texto != "0") {
			return true;
		}
		else {
			return false;
		}
	};
	
	parent.o = this;
	
}).call(ccb.obtener, ccb);


ccb.formatear = { NAME : 'ccb.formatear', VERSION : '2.0' };
(function(parent){

	/**
	 * Formatea una fecha como "DD/MM/AAAA"
	 * Devuelve "" si no se está pasando una dato de tipo fecha.
	 * @param {Object} fecha
	 */
	this.fecha = function (fecha) {
		if (typeof(fecha) == "string") {
			fecha = parent.obtener.fecha(fecha);
		}
		if (fecha == null || (typeof(fecha) != "object" && typeof(fecha) != "date"))
			return "";
		var f = new Date(fecha);
		var texto = "";
		var aux;
		aux = "00" + f.getDate();
		texto += aux.substring(aux.length - 2);
		aux = "00" + (f.getMonth() + 1);
		texto += "/" + aux.substring(aux.length - 2);
		aux = f.getFullYear();
		if (aux < 1000)
			aux += 1900;
		texto += "/" + aux;
		return texto;
	};
	
	/**
	 * Formatea una hora como "HH:MM:SS"
	 * Devuelve "" si no se está pasando una dato de tipo fecha.
	 * @param {Object} fecha
	 * @param {Object} mostrarSegundos
	 */
	this.hora = function (fecha, mostrarSegundos) {
		if (typeof(fecha) == "string") {
			fecha = parent.obtener.hora(fecha);
		}
		if (fecha == null || (typeof(fecha) != "object" && typeof(fecha) != "date"))
			return "";
		var f = new Date(fecha);
		var texto = "";
		var aux;
		aux = "00" + f.getHours();
		texto += aux.substring(aux.length - 2);
		aux = "00" + f.getMinutes();
		texto += ":" + aux.substring(aux.length - 2);
		if (mostrarSegundos || mostrarSegundos == null) {
			aux = "00" + f.getSeconds();
			texto += ":" + aux.substring(aux.length - 2);
		}
		return texto;
	};
	
	/**
	 * Formatea una fecha y hora como "DD/MM/AAAA HH:MM"
	 * Devuelve "" si no se está pasando una dato de tipo fecha.
	 * @param {Object} fecha
	 * @param {Object} mostrarSegundos
	 */
	this.fechaHora = function (fecha, mostrarSegundos) {
		var h;
		if (typeof(fecha) == "string") {
			fecha = parent.obtener.fechaHora(fecha);
		}
		if (fecha == null || (typeof(fecha) != "object" && typeof(fecha) != "date"))
			return "";
		h = this.hora(fecha, mostrarSegundos);
		return this.fecha(fecha) + h != "" ?" " + h : "";
	};
	
	/**
	 * Versión nueva de FormatearNumero usando expresiones regulares.
	 * @param {Number} numero   El valor numérico que hay que formatear.
	 * @param {Number} decimales   Nº de posiciones decimales.
	 */
	this.numero = function (numero, decimales){
	    if (typeof(numero) == "string")
	        numero = parent.obtener.numero(numero);
	    if (numero == null)
	        return "";
	    numero = Number(numero).toFixed(decimales);
	    numero = String(numero).replace(/\./, ",");
	    var re = /^([\+\-]?\d+)(\d\d\d)([\.\,][\d\.\,]+)?$/;
	    while (re.test(numero))
	    {
	        numero = numero.replace(re, "$1.$2$3");
	    }
	    return numero;
	};
	
	/**
	 * Devuelve una cadena de texto con "SI" o "NO".
	 * @param {Object} valor
	 */
	this.booleano = function (valor) {
		if (typeof(valor) == "string") {
			valor = parent.obtener.booleano(valor);
		}
		if (valor == null || valor == false || valor == 0) {
			return "NO";
		}
		else {
			return "SI";
		}
	};
	
	/**
	 * Segun un tipo basico o primitivo, realiza el formateo correspondiente segun el tipo
	 * @param {Object} pValue
	 */
	this.any = function	(pValue){
	
		/* utilizar typeof, en caso de 'object' probar instanceof de la clase: Date, Number, Boolean */
	
		var valor = "";	
		switch (true) {
			case typeof pValue == 'date' || (typeof pValue == 'object' && pValue instanceof Date) :
				valor = this.fechaHora(pValue);
				break;
			case !isNaN(pValue) || typeof pValue == 'number' || (typeof pValue == 'object' && pValue instanceof Number) :
				var dec = 0;
				dec = arguments.length > 1 ? parent.obtener.numero(arguments[1]) : 0;
				valor = this.numero(pValue, dec?dec:0);
				break;
			case typeof pValue == 'boolean' || (typeof pValue == 'object' && pValue instanceof Boolean):
				valor = this.booleano(pValue);
				break;
			case typeof pValue == 'object':
				valor = pValue.toString();
				break;
			default:
				valor = pValue;
				break;
		}
		return valor;
	};

}).call(ccb.formatear, ccb);



ccb.validar = { NAME : 'ccb.validar', VERSION : '2.0' };
(function (parent){

	/**
	 * 
	 * @param {Object} control
	 * @param {Object} decimales
	 */
	this.numero = function (control, decimales) {
	
		var x = typeof control == 'object' ? control.value : control;
		if (x == "")
			return true;
		x = parent.obtener.numero(x);
		if (x == null) {
			if (typeof control == 'object')
				control.focus();
			return false;
		}
		else {
			if (typeof control == 'object')
				control.value = parent.formatear.numero(x, decimales);
			return true;
		}
	};

	/**
	 * 
	 * @param {Object} control
	 */
	this.fecha = function (control) {
	
		var x = typeof control == 'object' ? control.value : control;
		if (x == "")
			return true;
		x = parent.obtener.fecha(x);
		if (x == null) {
			if (typeof control == 'object')
				control.focus();
			return false;
		}
		else {
			if (typeof control == 'object')
				control.value = parent.formatear.fecha(x);
			return true;
		}
	};
	
	/**
	 * 
	 * @param {Object} control
	 */
	this.hora = function (control) {
		var x = typeof control == 'object' ? control.value : control;
		if (x == "")
			return true;
		x = parent.obtener.hora(x);
		if (x == null) {
			if (typeof control == 'object')
				control.focus();
			return false;
		}
		else {
			if (typeof control == 'object')
				control.value = parent.formatear.hora(x);
			return true;
		}
	};

	/**
	 * 
	 * @param {Object} control
	 */
	this.fechaHora = function (control) {
		var x = typeof control == 'object' ? control.value : control;
		if (x == "")
			return true;
		x = parent.obtener.fechaHora(x);
		if (x == null) {
			if (typeof control == 'object')
				control.focus();
			return false;
		}
		else {
			if (typeof control == 'object')
				control.value = parent.formatear.fechaHora(x);
			return true;
		}
	};

	/**
	 * Validar un código numérico (toma la longitud del atributo MAXLENGTH del control)
	 * @param {Object} control
	 * @param {Object} obligatorio
	 */
	this.codigoNumerico = function (control) {
		var i;
		var x = parent.fncs.trim(typeof control == 'object' ? control.value : control);
		if (x == "")
			return true;
		for (i=0; i<x.length; i++) {
			if (isNaN(x.charAt(i))) {
				x = null;
				break;
			}
		}
		if (x == null) {
			if (typeof control == 'object')
				control.focus();
			return false;
		}
		else {
			if (typeof control == 'object'){
				if (x.length < control.maxLength) {
					// Añade ceros a la izquierda, hasta completar el campo.
					for (i = x.length; i < control.maxLength; i++) {
						x = '0' + x;
					}
					control.value = x;
				}
			}
			return true;
		}
	};

}).call(ccb.validar, ccb);


var img_loading = "data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAi9ra7dDQ6erq9AYGjQAAiy4un4KCxWBgtrq63yIimkpKrIqKyWRkuL6+4SYmnAQEjE5Orubm89jY7PT0+Tg4pNzc7vLy+La23aCg08rK5u7u9gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA";


function resetform() {
    var obj = document.all.form1;
    var i;
    for (i = (obj.all.length - 1); i >= 0; i--) {
        if (obj.all[i].type == "text") {
            obj.all[i].value = "";
            if (obj.all[i].antvalue != null) {
                obj.all[i].antvalue = "";
            }
        }
        if (obj.all[i].type == "select-one") {
            obj.all[i].options[0].selected = true;
            obj.all[i].fireEvent("onChange");
        }
        if (obj.all[i].type == "checkbox") {
            obj.all[i].checked = false;
            obj.all[i].fireEvent("onClick");
        }
    }
}

//********************************************************************************************************
// Mensajes de error
jQuery.fn.asError = function() {
    return this.each(function() {
        $(this).replaceWith(function(i, html) {
            var newHtml = "<div class='ui-state-error ui-corner-all' style='padding: 0 .7em;'>";
            newHtml += "<p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'>";
            newHtml += "</span>";
            newHtml += html;
            newHtml += "</p></div>";
            return newHtml;
        });
    });
};
 
jQuery.fn.asHighlight = function() {
    return this.each(function() {
        $(this).replaceWith(function(i, html) {
            var newHtml = "<div class='ui-state-highlight ui-corner-all' style='padding: 0 .7em;'>";
            newHtml += "<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'>";
            newHtml += "</span>";
            newHtml += html;
            newHtml += "</p></div>";
            return newHtml;
        });
    });
};

//------------------------------------------------------------------------------------------------
function showError(mensaje)
{
	var $divDialog = $('<div title="Error"></div>').prependTo('body');
	$divDialog.append(mensaje);
	$divDialog.dialog();	
}

function showAlert(mensaje)
{
	var $divDialog = $('<div title="Alert"/>').prependTo('body');
	$divDialog.append(mensaje);
	$divDialog.dialog({
		autoOpen: false,
		width: 400,
		height: 200});	
	$divDialog.dialog("open");
}

function $alert(mensaje, titulo)
{
	showAlert(mensaje);
}	

function $error(mensaje, titulo)
{
	showError(mensaje);	
}	
//---------------------------------------------------------------------------------------------------------------------------
function obtenerPeriodoCurso()
{
	var cursoActual = "";
	var hoy = new Date();
	cursoActual = hoy.getFullYear();
	if(hoy.getMonth() >= 7)
	{
		cursoActual = cursoActual + "_" + (cursoActual - 1);
	}
	else
	{
		cursoActual = (cursoActual - 1) + "_" + cursoActual;
	}	
	
	return cursoActual;
}
//------------------------------------------------------------------------------------------------------------------------
// DATEPICKER
function convertDatePicker(campoFecha) {
    campoFecha.datepicker({
        showOn: 'button',
        buttonImage: '../images/cal.png',
        buttonImageOnly: true,
        dateFormat: 'dd/mm/yy',
        onClose: function() { campoFecha.attr("disabled", false); },
        changeYear: true,
        yearRange: "1900:2020"
    });
}
//*****************************************************************************************************************************
//TEXTAREA MAXLENGT


//-----------------------------------------------------------------------------------------------------------------------------

jQuery.fn.numeric = function() {
    this.keydown(function(event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
};

jQuery.fn.outerHTML = function() {
    return jQuery('<div />').append(this.eq(0).clone()).html();
};

//********************************************************************************************************************

function getSqlProcedure(procedure, params)
{
	var parametrosStr = serializeJson(params);
	return procedure + "(" + parametrosStr +")";	
}

function serializeJson(jsonVar)
{
	var serializeArr = [];
	for (var key in jsonVar) {
	  if (jsonVar.hasOwnProperty(key)) {
	  	  switch (Object.prototype.toString.call(jsonVar[key])) {
		    case "[object String]":
		  		serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;
			case '[object Number]':
		  		serializeArr.push(jsonVar[key]);
		  		break;
			case "[object Null]":
		  		serializeArr.push( "Null" );
		  		break;		  		
			case '[object Date]':
			  	serializeArr.push("'" + jsonVar[key].toMysqlFormat()  + "'");
		  		break;
			case '[object Boolean]':
		  		serializeArr.push( jsonVar[key]);
		  		break;
			case 'undefined':
		  		//serializeArr.push( "'" + jsonVar[key] + "'" );
		  		break;	  			
			default:
		  		serializeArr.push( "Null" );
		  		break;
			}
	  }	  
	 }
	 return serializeArr.join(",");
}

//***********************************************************************************************************************************

function dateToString (d) {	
	if(!d)
	{
		return "";		
	}
	
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
	return(curr_date + "/" + curr_month + "/" + curr_year);  
}

function dateTimeToString (d) {	
	if(!d)
	{
		return "";		
	}
	
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
	
	var curr_hour = d.getHours();
	var curr_min = d.getMinutes();
	var curr_seg = d.getSeconds(); //getMilliseconds()
	
	return(curr_date + "/" + curr_month + "/" + curr_year + " " + curr_hour + ":" + curr_min + ":" + curr_seg);  
}
//***********************************************************************************************************************************

function tratarError(httpRequest, textStatus, errorThrown, mensaje)
{
	var mensajeAux = mensaje;
	if(httpRequest.status = 500)
	{
		try{
			var errorJson = eval(httpRequest.responseText);
			mensajeAux += "\n" + errorJson.Error;
		}
		catch(any){
			mensajeAux += "\n" + httpRequest.responseText;		
		}	
	}
	else
	{
		mensajeAux += "\n" + textStatus + errorThrown.message;	
	}
	
	alert(mensajeAux);
}

//********************************************************************************************************
//CARGAR LISTVIEW
jQuery.fn.LoadMySQL = function(params){
	//debugger;
	this.html("Cargando....");
	var comboJq = this;	
	
	var sql = "SELECT " + params.Text + " as Texto, " + params.Value + " as Valor ";
	
	if(params.JoinField)
	{
		sql += ", " + params.JoinField + " as JoinField "; 
	}
	
	sql += " FROM " + params.Table;
	
	this.CargarOk = function(data)
	{
		comboJq.html("");
		if(comboJq[0] === undefined)
		{
			return;
		}
		
		if(params.Default)
		{
			comboJq.append('<option value=' + params.Default.Value + '>' + params.Default.Text + '</option>');
		}
		
		if (data.NumRegistros == 0) {
			//alert("No se encontraron titulos.");
		}
		else {
			//var datos = data[1];
			var value, text;
			
			var Selected = "";
			var classjoinValue = "";

			for (var i = 0; i < data.NumRegistros; i++) {
				
				value = data[i].Valor;
				Selected = value == params.Selected ? "SELECTED": "";				
				text = data[i].Texto;	
				var auxStr;
				if(params.JoinField)
				{
					if(data[i].JoinField == params.JoinValue)
					{
						comboJq.append('<li class="ui-screen-hidden"><a href="javaScript:listViewClick("' + value +  '")"></a>' + text + '</li>');						
					}					
					continue;
				}
				var aAux = $("<a>");
				aAux.click(
					function()
					{
						params.fnHref(data[i]);	
					}					
				);
				//aAux.prop("href","javaScript:listViewClick('" + value +  "')");
				aAux.text(text);
				
				var auxLi = $('<li class="ui-screen-hidden" ></li>');				
				auxLi.append(aAux);
				comboJq.append(auxLi);				
			}
			
			comboJq.listview('refresh', true);
		}
	};
	
	this.CargarNOk = function(httpRequest, textStatus, errorThrown)
	{
		comboJq.html("");
		ccb.feedBack.endLoading();
		$error("Error en la carga." + httpRequest.responseText);	
	};
		
		
	if(params.Sync)
	{
		SyncConsultaSELECT({SQL: sql, Cached: false}, this.CargarOk, this.CargarNOk);	
	}
	else
	{		
		if(params.NoCached)
		{
			SyncConsultaSELECT({SQL: sql, Cached: false}, this.CargarOk, this.CargarNOk);	
		}
		else
		{
			SyncConsultaSELECT({SQL: sql, Cached: true}, this.CargarOk, this.CargarNOk);	
		}	
	}
	
		
};

//*********************************************************************************************************************************

/**
 * function to load a given js file 
 */ 
var loadJS = function(src) {
     var jsLink = $("<script type='text/javascript' src='"+src+"'>");
     $("head").append(jsLink); 
 };
 
 function loadLang(pageParam)
 {
	var page = "";
	
	if(pageParam)
	{
		page = pageParam;		
	}
	else
	{
		var userLang = navigator.language || navigator.userLanguage;  	
		var path = jQuery(location).attr('href');
		page = path.substr( path.lastIndexOf("/") + 1 );		
	}
	
	var fileLang = "js/" + page + "." + userLang + ".js";
	alert(fileLang);
	
	alert ("The language is: " + userLang);
	loadJS(fileLang);
	
	$(".labelMultiidioma").each(
		function()
		{
			if($(this).val)
			{
				$(this).val(lang[$(this).attr("Id")]);		
			}else
			{
				$(this).text(lang[$(this).attr("Id")]);			
			}
		}		
	);
 }





