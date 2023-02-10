let paises_array = [];
let animales_array = [];
//arreglo que guarda los paises para jugar
paises_array = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];
animales_array = [  "Perro",  "Gato",  "Caballo",  "Vaca",  "León",  "Elefante",  "Mono",  "Tigre",  "Oso",  "Zorro",  "Cangrejo",  "Canguro",  "Jirafa",  "Hipopótamo",  "Rinoceronte",  "Gorila",  "Avestruz",  "Ballena",  "Delfín",  "Orca",  "Osa polar",  "Leopardo",  "Pájaro",  "Serpiente",  "Ardilla",  "Castor",  "Rana",  "Mariposa",  "Langosta",  "Erizo",  "Koala",  "Cisne",  "Águila",  "Lince",  "Castor",  "Halcón",  "Pavo real",  "Conejo",  "Ardilla voladora",  "Cuervo",  "Ratón",  "Rana saltarina",  "Iguana",  "Tortuga",  "Puma",  "Cangrejo de río",  "Cangrejo de tierra",  "Lobo",  "Zebra",  "Jaguar",  "Búho",  "Linces marinos",  "Foca",  "Oso panda",  "Cangrejo ermitaño",  "Pangolín",  "Antílope",  "Alce",  "Babuino",  "Hipopotamo pigmeo",  "Pantera",  "Cangrejo boxeador",  "Oso hormiguero",  "Cangrejo de río gigante",  "Oso negro",  "Rana arbórea",  "Cangrejo de río de cuello largo",  "Pato",  "Cangrejo de río electrico",  "Tigre siberiano",  "Oso grizzly",  "Rana verde",  "Cangrejo de agua dulce",  "Ballena jorobada",  "Lémur",  "Oso pardo",  "Cangrejo de río de anillos azules",  "Bisonte americano",  "Cangrejo de herradura",  "Cangrejo de tierra gigante",  "Leopardo de las nieves",  "Cangrejo king crab"];
//arreglo donde se guradaran los paises desordenados
let paisesDesordenados=[];
//variable que guarda la posicion actual
let posJuegoActual = 0;
//variable que guarda la cantidad acertada
let cantidadAcertados = 0;

//ACENTOS
const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};

//funcion para desordenar los paises
function desordenarPaises(){
    paises = paises.sort(function() {return Math.random() - 0.5});
    for(var i=0;i<paises.length;i++){
        //convertimos el pais en un arreglo
        let pais = paises[i];
        pais = pais.toUpperCase();
        pais = pais.split('');
        var r = pais.map( letra => acentos[letra] || letra).join('').toString();
        pais = r.split(' ');

        //desordenamos el areglo
        let paisDesordenado = "";
        for (let index = 0; index < pais.length; index++) {
          let element = pais[index];
          element = element.split('');
          if(index != pais.length-1){
            paisDesordenado += element.sort(function(){return Math.random() - 0.5})+", ,";
          }else{
            paisDesordenado += element.sort(function(){return Math.random() - 0.5})
          }
        }
      
        //Convertimos el arreglo a string
        paisDesordenado = paisDesordenado.toString();
        paisDesordenado = paisDesordenado.replace(/,/g,"");
    
        //Guardamos el pais en el arreglo de paises desordenads
        paisesDesordenados.push(paisDesordenado);
    }
}

function mostrarNuevoPais(){
  letras_correctas = 0;
  //controlo si terminaron las palabras
  if(posJuegoActual >= 10){
    mostrarPantallaFinal();
  }
  let contenedorPais = document.getElementById("pais");
  //eliminamos todo lo que tiene el div del pais
  contenedorPais.innerHTML="";

  let pais = paisesDesordenados[posJuegoActual];
  pais = pais.split('');

  x=0;
  clearInterval(idInterval);
  move();
  for(i=0;i<pais.length;i++){

    let id = "letra_"+i;


    var div = document.createElement("div");
    if(pais[i] != " "){
      div.className = "letra";
    }else{
      div.className = "letra_2";
    }
    div.innerHTML = pais[i];
    div.setAttribute("id", id)
    
    div.onclick = (function() {comparar(id);});
    contenedorPais.appendChild(div);
  }
}

function mostrarPantallaFinal(){
  clearInterval(idInterval);
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "flex";
  document.getElementById("acertadas").innerHTML = cantidadAcertados;
  document.getElementById("tipo_resultado").innerHTML = tipo_juego+"es";
  posJuegoActual = 0;
  cantidadAcertados = 0;
}




//Funcion que compara el pais ingresado con el pais correcto
letras_correctas = 0;
function comparar(id){
  var element = document.getElementById(id);
  var letra_tocada = document.getElementById(id).innerHTML;
  var paisOrdanedo = paises[posJuegoActual];
  paisOrdanedo = paisOrdanedo.toUpperCase();
  paisOrdanedo = paisOrdanedo.split('');
  var paisOrdanedo = paisOrdanedo.map( letra => acentos[letra] || letra).join('').toString();
  paisOrdanedo = paisOrdanedo.split('');
  var letra_actual = paisOrdanedo[letras_correctas];

  if(letra_tocada == letra_actual){
    letras_correctas += 1;
    element.classList.add("letra_correcta");
  }else{
    element.classList.add("letra_incorrecta");
    setTimeout(()=>{
      element.classList.remove("letra_incorrecta");
    }, 200);
  }

  if(letras_correctas == paisOrdanedo.length){
    cantidadAcertados += 1;
    posJuegoActual += 1;
    document.getElementById("contador").innerHTML = cantidadAcertados;
    mostrarNuevoPais();
  }
  
}



let x = 0;
let idInterval;
function move() {
  if (x == 0) {
    x= 1;
    let elem = document.getElementById("myBar");
    let width = 1;
    idInterval = setInterval(frame, 400);
    function frame() {
      if (width >= 100) {
        clearInterval(idInterval);
        x = 0;
        posJuegoActual++;
        mostrarNuevoPais();
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

function comenzarJuego(){
  for (i = 0; i <= 10; i++){
    setTimeout("document.getElementById('categoria').style.opacity = '" + (i / 10) + "'", i * 100)
  }
}

var tipo_juego = "";

function play(tipo){
  switch (tipo) {
    case 1:
      tipo_juego = "Animal";
      paises = animales_array;
      break;
    case 2:
      tipo_juego = "Pais";
      paises = paises_array;
      break;
    default:
      break;
  }

  document.getElementById("tipo_juego").innerHTML = tipo_juego;
  setTimeout(()=>{
    paisesDesordenados=[];
    posJuegoActual = 0;
    cantidadAcertados = 0;
    desordenarPaises();
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    document.getElementById("pantalla-final").style.display = "none";
    mostrarNuevoPais();
    document.getElementById("contador").innerHTML = 0;
  }, 500);

}

function comenzar_de_nuevo(){
  document.getElementById("pantalla-inicio").style.display = "flex";
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "none";

  for (i = 10; i >= 0; i--){
    document.getElementById('categoria').style.opacity = "0";
  }
}