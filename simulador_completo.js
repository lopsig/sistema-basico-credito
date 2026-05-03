
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


const hideSection = () => {
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
}

const showSection = (idSection) => {
  hideSection()
  document.getElementById(idSection).classList.add("activa");
}

const guardarTasa = () => {
  let tasa = recuperarInt("tasaInteres");
  if (tasa<10 || tasa>20)  {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  } else {
    mostrarTexto("mensajeTasa", `Tasa configurada correctamente: ${tasa}%`);
  }
}