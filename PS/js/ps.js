
var configuraciones =
{
	0: {circleRadius: 1,
		rings: 1,
		balls: 50,
		fps: 150,
		rebotemaximo: 10,
		Vmaxima: 100,
		coefatraccion: 600,
		coefrepulsion: 2,
		rozamiento: 1,
		reboteatenuado: 1,
		radioCritico: 15,
		aplicarSealeja: true
	},
	1: {
		circleRadius: 1,
		rings: 1,
		balls: 50,
		fps: 100,
		rebotemaximo: 10,
		Vmaxima: 100,
		coefatraccion: 100,
		coefrepulsion: 0,
		rozamiento: 1,
		reboteatenuado: 1,
		radioCritico: 10
	},
	2: {
		circleRadius: 1,
		rings: 1,
		balls: 80,
		fps: 100,
		rebotemaximo: 5,
		Vmaxima: 20,
		coefatraccion: 50,
		coefrepulsion: 2,
		rozamiento: 1,
		reboteatenuado: 1,
		radioCritico: 25
	},
	3: { circleRadius: 1,
		rings: 1,
		balls: 70,
		fps: 100,
		rebotemaximo: 20,
		Vmaxima: 40,
		coefatraccion: 1000,
		coefrepulsion: -3000,
		rozamiento: .05,
		reboteatenuado: .001,
		radioCritico: 35
	},
	4: {
				circleRadius: 1,
		rings: 1,
		balls: 50,
		fps: 100,
		rebotemaximo: 30,
		Vmaxima:120,
		coefatraccion:1000,
		coefrepulsion:200,
		rozamiento:.5,
		reboteatenuado: .01,
		radioCritico: 20
	},
	5: {
		circleRadius: 1,
		rings: 1,
		balls: 200,
		fps: 100,
		rebotemaximo: 10,
		Vmaxima: 100,
		coefatraccion: 3,
		coefrepulsion: 0.01,
		rozamiento: 1,
		reboteatenuado: 1,
		radioCritico: 10
	},
	6: {//Planetas y sol
		circleRadius: 1,
		rings: 1,
		balls: 200,
		fps: 50,
		rebotemaximo: 20,
		Vmaxima: 100,
		coefatraccion: 100,
		coefrepulsion: 0,
		rozamiento: .06,
		reboteatenuado: 1,
		radioCritico: 10,
		aplicarSealeja: true
	},
	7: {
		circleRadius: 1,
		rings: 1,
		balls: 300,
		fps: 150,
		rebotemaximo: 20,
		Vmaxima: 100,
		coefatraccion: 150,
		coefrepulsion: 25,
		rozamiento: .01,
		reboteatenuado: 1,
		radioCritico: 10,
		aplicarSealeja: true
	},
	8: {circleRadius: 1,
		rings: 1,
		balls: 200,
		fps: 150,
		rebotemaximo: 10,
		Vmaxima: 100,
		coefatraccion: 600,
		coefrepulsion: 2000,
		rozamiento: .5,
		reboteatenuado: 1,
		radioCritico: 15,
		aplicarSealeja: false
	}
};

var canvas;
var stage;
var shape;
var circleRadius;
var rings;
var balls;
var fps;
var rebotemaximo;
var Vmaxima;
var coefatraccion;
var coefrepulsion;
var reboteatenuado;
var aplicarSealeja = true;
var rozamiento = 0;
var radioCritico = 15;

$(document).bind('pageinit', pageinit);

function pageinit(){			
	configurar("0");
	
	$(document).on("pageshow","#Canvas",function(){
	  init();
	});
	
	$(document).on("pageshow","#Configur",function(){ 
		circleRadius = $("#circleRadius").val();
		coefatraccion = $("#coefatraccion").val();	
		coefrepulsion = $("#coefrepulsion").val();
		rozamiento = $("#rozamiento").val();
		balls = $("#balls").val();
		radioCritico = $("#radioCritico").val();
		
	});
}

function chagealejamiento(valor) {
	if (valor = "1") {
		aplicarSealeja = true;
	}
	else {
		aplicarSealeja = false;
	}	
}

function configurar(confNumber) {
	params = configuraciones[confNumber];

	circleRadius = params.circleRadius;
	rings = params.rings;
	balls = params.balls;
	fps = params.fps;
	rebotemaximo = params.rebotemsximo;
	$("#Vmax").val(params.Vmaxima);
	coefatraccion = params.coefatraccion;
	coefrepulsion = params.coefrepulsion;
	$("#rozamiento").val(params.rozamiento);
	reboteatenuado = params.reboteatenuado;
	$("#radioCritico").val(params.radioCritico);
	aplicarSealeja = params.aplicarSealeja!=null?params.aplicarSealeja:true;
	
	$("#coefatraccion").val(params.coefatraccion);
	$("#coefrepulsion").val(params.coefrepulsion);
	$("#circleRadius").val(params.circleRadius);
	$("#balls").val(params.balls);
}

function createBall() {
	createshape();
}

function aumentarRadio() {
	$("#radioCritico").text(radioCritico);
	$("#Vmax").text(Vmaxima);
	radioCritico += 1;
}

function reducirRadio() {
	$("#radioCritico").text(radioCritico);
	$("#Vmax").text(Vmaxima);
	radioCritico -= 1;
}

function aumentarVmax() {
	$("#radioCritico").text(radioCritico);
	$("#Vmax").text(Vmaxima);
	Vmaxima += 1;
}

function reducirVmax() {
	$("#radioCritico").text(radioCritico);
	$("#Vmax").text(Vmaxima);
	Vmaxima -= 1;
}

function aumentarT() {
	circleRadius += 1;
	cambiarRadio(circleRadius);
}

function reducirT() {
	circleRadius -= 1;
	cambiarRadio(circleRadius);
	
}
function aumentarrozamiento() {
	rozamiento += .01;
	$("#rozamiento").text(rozamiento);
}

function reducirrozamiento() {
	rozamiento -= .01;
	$("#rozamiento").text(rozamiento);
}


function createshape(x, y, vx, vy) {
	var color = "#994422";
	//this.masa = 1;
	//this.color = "";
	/*
	if (Math.random() > .5) {
		color = "#000000";
		this.tipo = "p";
	}
	else {
		color = "#ffffff";
		this.tipo = "e";
	}
	*/
	//this.numero = stage.getNumChildren();

	//var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

	shape = new createjs.Shape();
	shape["circleRadius"] = circleRadius;
	
	for (var j = rings; j > 0; j--) {
		shape.graphics.beginFill(color).drawCircle(0, 0, circleRadius * j / rings);
	}

	if (x == null) {
		shape.x = Math.random() * canvas.width;
		shape.y = Math.random() * canvas.height;
		shape.velX = (Math.random() * 5 - 2.5);
		shape.velY = (Math.random() * 5 - 2.5);
	}
	else {
		shape.x = x;
		shape.y = y;
		shape.velX = vx;
		shape.velY = vy;
	}
	// turn snapToPixel on for all shapes - it's set to false by default on Shape.
	// it won't do anything until stage.snapToPixelEnabled is set to true.
	shape.snapToPixel = true;
	//if (shape.velX != 0 || shape.velY)  
	stage.addChild(shape);
}

function cloneshape(shapeclone) {
	var color = "#994422";

	this.numero = stage.getNumChildren();

	shape = new createjs.Shape();
	for (var j = rings; j > 0; j--) {
		shape.graphics.beginFill(color).drawCircle(0, 0, circleRadius * j / rings);
	}
	shape.x = shapeclone.x;
	shape.y = shapeclone.y;
	shape.velX = shapeclone.velX;
	shape.velY = shapeclone.velY;
	
	// turn snapToPixel on for all shapes - it's set to false by default on Shape.
	// it won't do anything until stage.snapToPixelEnabled is set to true.
	shape.snapToPixel = true;
	//if (shape.velX != 0 || shape.velY)  
	stage.addChild(shape);
}

var shapes = [];
var w;
var h;
function init() {
	canvas = document.getElementById("testCanvas");	
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);	
	stage = new createjs.Stage(canvas);
	
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;	

	// create a new stage and point it at our canvas:
	//canvas = document.getElementById("testCanvas");
	//stage = new createjs.Stage(canvas);

	// create a large number of slightly complex vector shapes, and give them random positions and velocities:

	//var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

	//configurar("1");
	for (var i = 0; i < $("#balls").val(); i++) {
		//shapes.push(new createshape());
		createshape();
	}

	// add a text object to output the current FPS:
	//fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#FFF");
	//stage.addChild(fpsLabel);
	//fpsLabel.x = 10;
	//fpsLabel.y = 20;

	// start the tick and point it at the window so we can do some work before updating the stage:
	createjs.Ticker.addListener(window);
	createjs.Ticker.setFPS(fps);
}


var gravedad = 0;
var cambiandoTamano = false;

function cambiarRadio(radio) {
	cambiandoTamano = true;
	var l = stage.getNumChildren();

	for (var i = 0; i < l; i++) {	        
		var shape = stage.getChildAt(i);
		var x= shape.x; 
		var y = shape.y;
		var velX = shape.velX;
		var velY = shape.velY;
		
		stage.removeChild(shape);
		createshape(x, y, velX, velY);
		//stage.removeChild(shape);
		//shape.graphics.beginFill(color).drawCircle(0, 0, radio);
	}
/*
	for (var i = 0; i < l; i++) {
		shape = stage.getChildAt(i);
		stage.removeChild(shape);
	}
	*/
	cambiandoTamano = false;
}  
	  
function tick() {
	if(cambiandoTamano)
		return;
	
	w = canvas.width;
	h = canvas.height;

	var l = stage.getNumChildren();
	//var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];
	// iterate through all the children and move them according to their velocity:
	
	var energiaI = 0;
	
	for (var i = 0; i < l; i++) {
		var shape = stage.getChildAt(i);
		var rebote = false;
		var energia = 0;
		var energiaPotencial = 0;
		
		//energia += Math.pow(modulo(velocidad(shape)), 2) / 2;
		// Rebotes
		var atraccionR1R2;
		var dV;
		var d;
		var n;
		var r1r2;
		var otherShape;
		
		for (var ii = 0; ii < l; ii++) {
			otherShape = stage.getChildAt(ii);
			//energia += Math.pow(modulo(velocidad(otherShape)), 2) / 2;
			r1r2 = { x: otherShape.x - shape.x, y: otherShape.y - shape.y };
			d = modulo(r1r2);
								
			n = { x: r1r2.x / d, y: r1r2.y / d };
			
			atraccionR1R2 = { x: n.x / (Math.pow(d, 2)), y:  n.y / (Math.pow(d, 2)) };

			//distancia posterior
			dV = Math.sqrt(Math.pow((shape.x + shape.velX - otherShape.x - otherShape.velX), 2) + Math.pow((shape.y + shape.velY - otherShape.y - otherShape.velY), 2));

			if (ii == i) {
				continue;
			}
			//energiaPotencial += d;
			
			/*
			if (modulo(velocidad(shape)) > 10) {
				if (shape.velX > 0) {
					shape.velX = (Math.sqrt(Math.pow(shape.velX, 2)) - (Math.pow(shape.velX, 2) * 2) / 10000);
				}
				else if (shape.velX < 0) {
					shape.velX = (-1) * (Math.sqrt(Math.pow(shape.velX, 2)) - (Math.pow(shape.velX, 2) * 2) / 10000);
				}

				if (shape.velY > 0) {
					shape.velY = (Math.sqrt(Math.pow(shape.velY, 2)) - (Math.pow(shape.velY, 2) * 2) / 10000);
				}
				else if (shape.velY < 0) {
					shape.velY = (-1) * (Math.sqrt(Math.pow(shape.velY, 2)) - (Math.pow(shape.velY, 2) * 2) / 10000);
				}
			}
			*/

			//debugger;
			/*
			if (shapes[ii] && shapes[i] && shapes[ii].tipo == shapes[i].tipo) {
				coefatraccion = coefatraccion * (-1);
			}   
			*/                 
			var seAleja = (dV - d > 0);
			var enradiodeaccion = (2 * circleRadius + radioCritico) >= d;
			
			//Cuando aplicar es true, solo se atraen los que se separan
			if (!aplicarSealeja) seAleja = true;
			
			
			//if ((2 * circleRadius + 200) < d && (dV - d > 0)) {
			if (!enradiodeaccion) {//&& (dV - d > 0)
				otherShape.velX = otherShape.velX - coefatraccion * atraccionR1R2.x;
				otherShape.velY = otherShape.velY - coefatraccion * atraccionR1R2.y;
			}
			else if (enradiodeaccion && !seAleja) {
				//coefrepulsion = Math.sqrt(Math.pow(coefrepulsion, 2));
				otherShape.velX = otherShape.velX + coefrepulsion * atraccionR1R2.x;
				otherShape.velY = otherShape.velY + coefrepulsion * atraccionR1R2.y;
			}
			
						
			if (modulo(velocidad(otherShape)) > Vmaxima) {
				var m = modulo(velocidad(otherShape));
				otherShape.velX = (Vmaxima / Math.sqrt(2)) * (otherShape.velX / m);
				otherShape.velY = (Vmaxima / Math.sqrt(2)) * (otherShape.velY / m);
			}
						
			//try {
				
				// solo es choque si se están acercando
				if ((2 * circleRadius) >= d && (dV - d < 0)) {

					rebote = true;
					//debugger;
					//var n = { x: r1r2.x / d, y: r1r2.y / d };
					var t = { x: (-1) * n.y, y: n.x };
					var v1 = velocidad(shape);
					var v2 = velocidad(otherShape);

					var v1n = reboteatenuado * dotProduct(n, v1);
					var v2n = reboteatenuado * dotProduct(n, v2);

					var v1t = dotProduct(t, v1);
					var v2t = dotProduct(t, v2);

					var v1nf = { x: n.x * v2n, y: n.y * v2n };
					var v2nf = { x: n.x * v1n, y: n.y * v1n };

					var v1tf = { x: t.x * v1t, y: t.y * v1t };
					var v2tf = { x: t.x * v2t, y: t.y * v2t };

					var v1f = sum(v1nf, v1tf);
					var v2f = sum(v2nf, v2tf);

					//var energiaInicial = (0.5) * Math.pow(modulo(v1), 2) + (0.5) * Math.pow(modulo(v2), 2);
					//var energiaFinal = (0.5) * Math.pow(modulo(v1f), 2) + (0.5) * Math.pow(modulo(v2f), 2);

					if (modulo(v1f) > rebotemaximo) {
						v1f = { x: (rebotemaximo / Math.sqrt(2)) * (v1f.x / modulo(v1f)), y: (rebotemaximo / Math.sqrt(2)) * (v1f.y / modulo(v1f)) }
					}

					if (modulo(v2f) > rebotemaximo) {
						v2f = { x: (rebotemaximo / Math.sqrt(2)) * (v2f.x / modulo(v2f)), y: (rebotemaximo / Math.sqrt(2)) * (v2f.y / modulo(v2f)) }
					}
					
					//alert(energiaFinal - energiaInicial);

					//if ((energiaFinal - energiaInicial) == 0) {
						shape.velX =  v1f.x;
						shape.velY =  v1f.y;

						otherShape.velX =  v2f.x;
						otherShape.velY =  v2f.y;
					//}                            
				}
			/*
			}
			catch (any) {
				alert(any);
			}
			*/
			/*
			if ((2 * circleRadius) < d) {
				shape.velX = shape.velX + atraccionR1R2.x;
				shape.velY = shape.velY + atraccionR1R2.y;
			}
			*/
		}

		
		if ((shape.velX > 0 && shape.x > (w - circleRadius))
			|| (shape.velX < 0 && shape.x < (0 + circleRadius))
			) {
			shape.velX = (-1) * shape.velX;
			rebote = true;
		}
		else {

		}

		if ((shape.velY > 0 && shape.y > (h - circleRadius))
			|| (shape.velY < 0 && shape.y < (0 + circleRadius))
			) {
			shape.velY = (-1) * shape.velY;
		}
		else {
			//Gravedad
			//shape.velY = shape.velY + 1;
			// debugger;
		   /*
			if (!rebote) {
				shape.velX = shape.velX + atraccionR1R2.x;
				shape.velY = shape.velY + atraccionR1R2.y;

				otherShape.velX = otherShape.velX - atraccionR1R2.x;
				otherShape.velY = otherShape.velY - atraccionR1R2.y;
			}
		  */

		}
	  

		 // Gravedad del resto 
		//if (((2 * circleRadius) < d) && (!rebote)) {
		//if  (!rebote) {
		 //   shape.velX = shape.velX + atraccionR1R2.x;
		 //   shape.velY = shape.velY + atraccionR1R2.y;
		//}

		// Velocidad tope
		
		/*
		if (modulo(velocidad(shape)) > 5) {
			//var aux = velocidad(shape);
			shape.velX = Math.sqrt(5) * shape.velX/(modulo(velocidad(shape)));
			shape.velY = Math.sqrt(5) * shape.velY / (modulo(velocidad(shape)));
		}
		*/

			//shape.velX = Math.sqrt(30000) * shape.velX / (energia);
			//shape.velY = Math.sqrt(30000) * shape.velY / (energia);
			

		shape.x = shape.x + rozamiento * shape.velX;
		shape.y = shape.y + rozamiento * shape.velY + gravedad;
		
	   // var w = canvas.width;
	   // var h = canvas.height;
		
		//shape.x = (shape.x+shape.velX+w)%w;
		//shape.y = (shape.y+shape.velY+h)%h;
	}

	//fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";

	// draw the updates to stage:
	stage.update();
}

function toggleGravedad(value) {
	// iterate all the children except the fpsLabel, and set up the cache:
	if (value) {
		gravedad = 1;
	} else {
		gravedad = 0;
	}
}

function toggleCache(value) {
	// iterate all the children except the fpsLabel, and set up the cache:
	var l = stage.getNumChildren();

	for (var i = 0; i < l; i++) {
		var shape = stage.getChildAt(i);
		if (value) {
			shape.cache(-circleRadius, -circleRadius, circleRadius * 2, circleRadius * 2);
		} else {
			shape.uncache();
		}
	}
}

function cosVectores(v1, v2)
{
	var mv1 = modulo(v1);
	var mv2 = modulo(v2);
	return (v1.x * v2.x + v1.y * v2.y) / (mv1 * mv2);
}

function senVectores(v1, v2) {
	return Math.sqrt(1 - Math.pow(cosVectores(v1, v2), 2));
}

function modulo(v) {
	return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
}

function velocidad(forma) {
	return { x: forma.velX, y: forma.velY };
}

function getEnergia() {
	var energia = 0;
	var l = stage.getNumChildren() - 1;
	for (var e = 0; e < l; e++) {
		var shapeA = stage.getChildAt(e);
		energia += Math.pow(modulo(velocidad(stage.getChildAt(e))), 2)/2;
	}
	alert("Energía total:" + energia);
}

function getEnergiaValue() {
	var energia = 0;
	var l = stage.getNumChildren() - 1
	for (var e = 0; e < l; e++) {
		var shapeA = stage.getChildAt(e);
		energia += Math.pow(modulo(velocidad(stage.getChildAt(e))), 2) / 2;
	}
	return energia;
}

function dotProduct(v1, v2) {
	return (v1.x * v2.x + v1.y * v2.y);
}


function sum(v1, v2) {
	return { x: v1.x + v2.x, y: v1.y + v2.y };
}
