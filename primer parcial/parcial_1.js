var idSerie = 1;
var listaDeSeries = []
var serieSeleccionada = undefined;
var nombreIngresado = "";
const btnCrear = document.querySelector("#btn-crear");
const btnCrearSerie = document.querySelector("#btn-crearSerie");
const btnEditar = document.querySelector("#btn-editar");
const btnCancelar = document.querySelector("#btn-cancelar");
const modal = document.querySelector("#modal");
const modal2 = document.querySelector("#modal2");
const btnEditarSerie = document.querySelector("#btn-editarSerie");
const btnCancelar2 = document.querySelector("#btn-cancelar2");

//var buscar = document.getElementById("buscarSerie").value;


class Serie {
    constructor(nombre,temporadas, id="a", tempVistas=0) {
      this.nombre = nombre;
      this.temporadas = temporadas;
      this.tempVistas = tempVistas;
      this.id = id + idSerie;
    }
    porcentaje(){
      let porcentaje = (this.tempVistas * 100) / this.temporadas;
      return Math.round(porcentaje);
    }
  }
function crearSerie(nombre,temporadas){
    let serie = new Serie(nombre,temporadas);
    listaDeSeries.push(serie);
    creaFilaDeSerie(serie);
    idSerie++;
};
function creaFilaDeSerie(serie= Serie) {
    document.querySelector( "div.serie").insertAdjacentHTML("afterend", 
      "<div class=\"row-8 d-flex oculto contenedor\" id=\"" + serie.id +"\" >\
        <div class=\"col-1 contenedor d-flex \"></div>\
        <div class=\"col contenedor d-flex\"><span>"+ serie.nombre +"</span></div>\
        <div class=\"col contenedor d-flex\">"+ serie.temporadas +"</div>\
        <div class=\"col contenedor d-flex\">0</div>\
        <div class=\"col contenedor d-flex\">"+ serie.porcentaje() + " % </div>\
      </div>");           
}
function crearSerieDesdeHTML() {
  let nombre = document.getElementById("iNombre").value;
  let temporadas = document.getElementById("iTemp").value;
  crearSerie(nombre,temporadas);
}
function actualizarSerieFront() {
  document.getElementById(serieSeleccionada.id).children[1].innerText = serieSeleccionada.nombre;
  document.getElementById(serieSeleccionada.id).children[2].innerText = serieSeleccionada.temporadas;
  document.getElementById(serieSeleccionada.id).children[3].innerText = parseInt(serieSeleccionada.tempVistas);
  document.getElementById(serieSeleccionada.id).children[4].innerText = serieSeleccionada.porcentaje() + " % ";
}
function actualizarSerieBack(nombre,temporadas,vistas) {
  serieSeleccionada.nombre = nombre;
  serieSeleccionada.temporadas = temporadas;
  serieSeleccionada.tempVistas = vistas;
}
btnCrear.addEventListener("click", ()=>{
  modal.showModal();
});
btnCrearSerie.addEventListener("click", ()=>{
  crearSerieDesdeHTML();
  modal.close();
});
btnCancelar.addEventListener("click", ()=>{
  modal.close();
});
btnEditar.addEventListener("click", ()=>{
  modal2.showModal();
});
btnEditarSerie.addEventListener("click", ()=>{
  let nombre = document.getElementById("iNombre2").value;
  let temporadas = document.getElementById("iTemp2").value;
  let vistas = document.getElementById("iVistas").value;
  actualizarSerieBack(nombre,temporadas,vistas);
  actualizarSerieFront()
  modal2.close();
});
btnCancelar2.addEventListener("click", ()=>{
  modal2.close();
});





//function ingresarSerie(nombre,temporadas){
//  return creaFilaDeSerie(nombre,temporadas)
//}
function seleccionarSerie() {
  nombreIngresado = document.getElementById("iID").value;
  if (serieSeleccionada != undefined) {
    document.getElementById(serieSeleccionada.id).classList.add("contenedor");
  };
  if (nombreIngresado == "") {
    serieSeleccionada = undefined;
    alert("No se ha ingresado ningun nombre");
  };

  listaDeSeries.forEach(serie => {
    if (serie.nombre == nombreIngresado) {
      serieSeleccionada = serie;
      document.getElementById(serieSeleccionada.id).classList.toggle("contenedor")
    }
  });
  if (serieSeleccionada == undefined) {
    alert("No se encontro la serie");
  }; 
  };

function modificaTempVistas(cantidad) {
  let nuevaCantidad = parseInt(serieSeleccionada.tempVistas) + cantidad;
  if (serieSeleccionada != undefined && nombreIngresado == serieSeleccionada.nombre ) { 
    actualizarSerieBack(serieSeleccionada.nombre,serieSeleccionada.temporadas,nuevaCantidad );
    actualizarSerieFront();
  }
}
//var datos = ["Los Simuladores","3"]
//function serie(){
//  crearSerie(...datos);
//}

//var a = document.querySelectorAll("div.serie")
//const nodelist = document.querySelectorAll('span');
//const nodelistToArray = Array.apply(null, nodelist);
//
//var a = document.querySelector("#a0");
//a.innerText.split("\n")[0] 

function scriptSeries (){
  let seriesScript =[crearSerie("Los Simuladores",3),crearSerie("Game of Thrones",8),crearSerie("The Walking Dead",9),crearSerie("The Big Bang Theory",7),
  crearSerie("The Flash",3),crearSerie("The Vampire Diaries",5),crearSerie("Super campeones",12),crearSerie("Lost",6),crearSerie("Stranger thinks",4)];
  scriptSeries.forEach(this);
};







//var miamiBoton = document.querySelector("#miami");
//var miamiImagen = document.querySelector("#miamiImg");
//miamiBoton.addEventListener("click", function(){
//    miamiImagen.classList.toggle("oculto");
//});
////nodelistToArray.forEach(...);
//nodelistToArray.map(...);
//nodelistToArray.slice(...);