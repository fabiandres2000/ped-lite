var num1, num2, respuesta;
var preg = 0;
var buenas = 0;

txt_suma = document.getElementById("suma");
op1 = document.getElementById("op1");
op2 = document.getElementById("op2");
op3 = document.getElementById("op3");
txt_msj = document.getElementById("msj");
txt_resultado = document.getElementById("resultado");

function comenzar(){
	txt_resultado.innerHTML = "?";
	txt_msj.innerHTML = "";

	//genera la suma - Numeros aleatorios entre 0 1 9
	num1 = Math.round(Math.random()*9);
	num2 = Math.round(Math.random()*9);

	// generar numero aleatorio entre 0 y 1 
	operacion = Math.round(Math.random()*1);
	signo = "";
	if(operacion == 1){
		signo = "-";
		while(num1 <= num2){
			num1 = Math.round(Math.random()*9);
			num2 = Math.round(Math.random()*9);
		}
		respuesta = num1 - num2;
	}else{
		signo = "+";
		respuesta = num1 + num2;
	}

	
	//asignamos lo números para que se muestren
	suma.innerHTML = num1 + signo + num2 + " = ";

	//genero un número entre 0 y 2 para colocar la opcion correcta
	indiceOpCorrecta = Math.round(Math.random()*2);
	console.log(indiceOpCorrecta);

	//si indiceCorrrecta es igual 0
	if(indiceOpCorrecta == 0){
		op1.innerHTML = respuesta;
		op2.innerHTML = respuesta + 1;
		op3.innerHTML = respuesta - 1
	}
	if(indiceOpCorrecta == 1){
		op1.innerHTML = respuesta-1;
		op2.innerHTML = respuesta;
		op3.innerHTML = respuesta - 2;
	}
	if(indiceOpCorrecta == 2){
		op1.innerHTML = respuesta+ 2;
		op2.innerHTML = respuesta + 3;
		op3.innerHTML = respuesta;
	}

	preg = preg + 1;

	if(preg == 11){
		Swal.fire(
			'Finalizado',
			buenas+' de 10 respuestas correctas',
			'info'
		);

		preg = 1;
		buenas = 0;

		for (let index = 1; index < 11 ; index++) {
			document.getElementById("preg_"+index).innerHTML = ""		
		}
	}
}

var seleccionado = null;
function controlarRespuesta(opcionElegida){	
	seleccionado = opcionElegida;
	txt_resultado.innerHTML = opcionElegida.innerHTML;
	opcionElegida.style.backgroundColor = "black";

	if(respuesta == opcionElegida.innerHTML){
		txt_msj.innerHTML = "Ecxelente !";
		txt_msj.style.color="green";
		document.getElementById("preg_"+preg).innerHTML = "<i style='color: green' class='fa-sharp fa-solid fa-face-smile fa-2x'></i>";
		setTimeout(limpiar, 1500);
		setTimeout(comenzar, 1500);
		buenas += 1;
	}else{
		txt_msj.innerHTML = "Respuesta Incorrecta !";
		txt_msj.style.color="red";
		setTimeout(limpiar, 1500);
		setTimeout(comenzar, 1500);
		document.getElementById("preg_"+preg).innerHTML = "<i style='color: red' class='fa-solid fa-face-sad-tear fa-2x'></i>";
	}
}
function limpiar(){
	txt_resultado.innerHTML = "?";
	txt_msj.innerHTML = "";
	seleccionado.style.backgroundColor = "#612e82";
}

comenzar();











