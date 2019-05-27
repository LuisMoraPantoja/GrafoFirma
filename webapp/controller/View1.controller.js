sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("app.firma.Firma.controller.View1", {
		onInit: function () {
		 //$(".exampleDiv").append('<html:canvas id="pizarra" name="pizarra"></html:canvas>');
		  
		 
			
		}
		,
		onAfterRendering: function() {
			// this.onFuncionCanvas();
			this.iniciarCanvas();
				
				
		// 	this.miCanvas.width = 500;
		// 	this.miCanvas.height = 500;
		// 	 this.miCanvas.addEventListener('mousedown', this.empezarDibujo(pintarLinea,lineas), false);
		// 	 this.miCanvas.addEventListener('mousemove', this.dibujarLinea(event,pintarLinea,this.miCanvas,lineas,correccionX,correccionY), false);
		// 	 this.miCanvas.addEventListener('mouseup', this.pararDibujar(pintarLinea), false);

  //  // Eventos pantallas táctiles
		// 	 this.miCanvas.addEventListener('touchstart', 	this.empezarDibujo(pintarLinea,lineas), false);
		// 	 this.miCanvas.addEventListener('touchmove', this.dibujarLinea(event,pintarLinea,this.miCanvas,lineas,correccionX,correccionY), false);
		},
		
		iniciarCanvas: function (){
			$(".exampleDiv").append('<canvas id="pizarra" name="pizarra"></canvas>');
			var self = this;
		    this.miCanvas = document.getElementsByName("pizarra")[0];
		    var lineas = [];
			var correccionX = 0;
			var correccionY = 0;
			this.pintarLinea = false;
				
			var posicion = this.miCanvas.getBoundingClientRect();
				    correccionX = posicion.x;
				    correccionY = posicion.y;
				    
			// this.miCanvas.width = 500;
			// this.miCanvas.height = 500;
		
		
				 this.miCanvas.addEventListener('mousedown',function(event){
				 	console.log("funcion pintarlineas" , event);
				 	self.empezarDibujo(self.pintarLinea,lineas);
				 });
				 this.miCanvas.addEventListener('mousemove',function(event){
				 	console.log("funcion dibujar" , event);
				 	self.dibujarLinea(event,self.pintarLinea,self.miCanvas,lineas,correccionX,correccionY);
				 });
				 this.miCanvas.addEventListener('mouseup',function(event){
				 	console.log("funcion parar dibujar" , event);
				 	self.pararDibujar(self.pintarLinea);
				 });
		},
		
		empezarDibujo: function(pintarLinea,lineas) {
			   
		        this.pintarLinea = true;
		        lineas.push([]);
    	},

    /**
     * Funcion dibuja la linea
     */
    dibujarLinea: function (event,pintarLinea,miCanvas,lineas,correccionX,correccionY) {
        event.preventDefault();
        if (pintarLinea) {
            var ctx = miCanvas.getContext('2d');
            // Estilos de linea
            ctx.lineJoin = ctx.lineCap = 'round';
            ctx.lineWidth = 2;
            // Color de la linea
            ctx.strokeStyle = '#222';
            // Marca el nuevo punto
            var nuevaPosicionX = 0;
            var nuevaPosicionY = 0;
            if (event.changedTouches == undefined) {
                // Versión ratón
                nuevaPosicionX = event.layerX;
                nuevaPosicionY = event.layerY;
            } else {
                // Versión touch, pantalla tactil
                nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
                nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
            }
            // Guarda la linea
            lineas[lineas.length - 1].push({
                x: nuevaPosicionX,
                y: nuevaPosicionY
            });
            // Redibuja todas las lineas guardadas
            ctx.beginPath();
            lineas.forEach(function (segmento) {
                ctx.moveTo(segmento[0].x, segmento[0].y);
                segmento.forEach(function (punto, index) {
                    ctx.lineTo(punto.x, punto.y);
                });
            });
            ctx.stroke();
        }
    },

    /**
     * Funcion que deja de dibujar la linea
     */
    pararDibujar: function(pintarLinea) {
        this.pintarLinea = false;
    },
   limpiarDibujo: function(e){
    
   	 $(".exampleDiv").empty();
   	 this.iniciarCanvas();
   }
	});
});