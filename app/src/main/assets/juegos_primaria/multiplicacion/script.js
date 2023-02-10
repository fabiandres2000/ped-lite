var num1, num2, respuesta;
var preg = 0;
var buenas = 0;

txt1 = document.getElementById("num_1");
txt2 = document.getElementById("num_2");
op1 = document.getElementById("op1");
op2 = document.getElementById("op2");
op3 = document.getElementById("op3");
txt_msj = document.getElementById("msj");
txt_resultado = document.getElementById("resultado");

function comenzar(){
	txt_resultado.innerHTML = "?";
	txt_msj.innerHTML = "";

	//genera la suma - Numeros aleatorios entre 0 1 9
	num1 = Math.round(Math.random()*99);
	num2 = Math.round(Math.random()*9);

	signo = " x ";
		
	respuesta = num1 * num2;
	
	//asignamos lo números para que se muestren
	txt1.innerHTML = num1;
	txt2.innerHTML = "x &nbsp;&nbsp;&nbsp;&nbsp;"+num2;

	//genero un número entre 0 y 2 para colocar la opcion correcta
	indiceOpCorrecta = Math.round(Math.random()*2);
	console.log(indiceOpCorrecta);

	//si indiceCorrrecta es igual 0
	if(indiceOpCorrecta == 0){
		op1.innerHTML = respuesta;
		op2.innerHTML = respuesta + 6;
		op3.innerHTML = respuesta - 4
	}
	if(indiceOpCorrecta == 1){
		op1.innerHTML = respuesta-3;
		op2.innerHTML = respuesta;
		op3.innerHTML = respuesta - 5;
	}
	if(indiceOpCorrecta == 2){
		op1.innerHTML = respuesta+ 2;
		op2.innerHTML = respuesta + 6;
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











