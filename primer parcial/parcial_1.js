var idSerie = 1;
var listaDeSeries = []
var serieSeleccionada = undefined;
const btnCrear = document.querySelector("#btn-crear");
const btnCrearSerie = document.querySelector("#btn-crearSerie");
const btnEditar = document.querySelector("#btn-editar");
const btnCancelar = document.querySelector("#btn-cancelar");
const modal = document.querySelector("#modal");
const modal2 = document.querySelector("#modal2");
const btnEditarSerie = document.querySelector("#btn-editarSerie");
const btnCancelar2 = document.querySelector("#btn-cancelar2");
const btnBuscar = document.querySelector("#buscar");
const btnSumar = document.querySelector("#sumar");
const btnRestar = document.querySelector("#restar");



function validarNumero(numero) {
  if (numero < 1 || !Number.isInteger(numero) ) {
    alert("El numero debe ser entero mayor a 0");
  }
  else { 
    return numero;
  }
};
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
};
function crearSerie(nombre,temporadas){
    let serie = new Serie(nombre,temporadas);
    listaDeSeries.push(serie);
    creaFilaDeSerie(serie);
    document.getElementById(serie.id).addEventListener("click", ()=>{
      seleccionarSerie(nombre);
    });
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
};
function crearSerieDesdeHTML() {
  let nombre = document.getElementById("iNombre").value;
  let temporadas = validarNumero(parseInt(document.getElementById("iTemp").value));
  if (temporadas == undefined) {
    alert("la serie no se ha creado");
  }
  else {
    crearSerie(nombre, temporadas);
  }
};
function actualizarSerieFront() {
  document.getElementById(serieSeleccionada.id).children[1].innerText = serieSeleccionada.nombre;
  document.getElementById(serieSeleccionada.id).children[2].innerText = serieSeleccionada.temporadas;
  document.getElementById(serieSeleccionada.id).children[3].innerText = parseInt(serieSeleccionada.tempVistas);
  document.getElementById(serieSeleccionada.id).children[4].innerText = serieSeleccionada.porcentaje() + " % ";
};
function actualizarSerieBack(nombre,temporadas,vistas) {
  serieSeleccionada.nombre = nombre;
  serieSeleccionada.temporadas = temporadas;
  serieSeleccionada.tempVistas = vistas;
};
function seleccionarSerie(nombre) {
  //nombreIngresado = document.getElementById("iID").value;
  if (serieSeleccionada != undefined) {   //--si habia una serie seleccionada, a borra--
    document.getElementById(serieSeleccionada.id).classList.add("contenedor");
  };
  if (nombre == "") {
    serieSeleccionada = undefined;
    alert("No se ha ingresado ningun nombre");
  };

  listaDeSeries.forEach(serie => {
    if (serie.nombre == nombre) {
      serieSeleccionada = serie;
      document.getElementById(serieSeleccionada.id).classList.toggle("contenedor")
    }
  });
  if (serieSeleccionada == undefined) {
    alert("No se encontro la serie");
  }; 
};
function modificaTempVistas(cantidad) {
  let maxTemp = serieSeleccionada.temporadas;
  let nuevaCantidad = parseInt(serieSeleccionada.tempVistas) + cantidad;
  if (serieSeleccionada != undefined && nuevaCantidad >= 0 && nuevaCantidad <= maxTemp){ 
    actualizarSerieBack(serieSeleccionada.nombre,serieSeleccionada.temporadas,nuevaCantidad );
    actualizarSerieFront();
  }
};
// ---------- Eventos --------------------

btnSumar.addEventListener("click", function(){
  modificaTempVistas(1);
});
btnRestar.addEventListener("click", function(){
  modificaTempVistas(-1);
});


btnBuscar.addEventListener("click", () => {
seleccionarSerie(document.getElementById("iID").value)
});
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
  let temporadas = parseInt(document.getElementById("iTemp2").value);
  let vistas = validarNumero(parseInt(document.getElementById("iVistas").value));
  if (temporadas == undefined || vistas == undefined) {
    alert("No se edito la serie");
  }
  else {
    actualizarSerieBack(nombre,temporadas ,vistas );
    actualizarSerieFront()
  }
  modal2.close();
});
btnCancelar2.addEventListener("click", ()=>{
  modal2.close();
});

// ---------- Script que crea series al inicio -------------------- esto no es parte del parcial es a modo de ejemplo

function scriptSeries (){
  let seriesScript =[crearSerie("Los Simuladores",3),crearSerie("Game of Thrones",8),crearSerie("The Walking Dead",9),crearSerie("The Big Bang Theory",7),
  crearSerie("The Flash",3),crearSerie("The Vampire Diaries",5),crearSerie("Super campeones",12),crearSerie("Lost",6),crearSerie("Stranger thinks",4)];
  scriptSeries.forEach(this);
};
