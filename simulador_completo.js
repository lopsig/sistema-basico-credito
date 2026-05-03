
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

const guardarCliente = () => {
  let cedula = recuperaraTexto("inputCedula");
  let nombre = recuperaraTexto("inputNombre");
  let apellido = recuperaraTexto("inputApellido");
  let ingresos = recuperarFloat("inputIngresos")
  let egresos = recuperarFloat("inputEgresos")

  let cliente = {}
  cliente.cedula = cedula
  cliente.nombre = nombre
  cliente.apellido = apellido
  cliente.ingresos = ingresos
  cliente.egresos = egresos

  clientes.push(cliente)
  pintarClientes()
}

const pintarClientes = () => {
  let cmpTabla = document.getElementById("tablaClientes")
  let contenidoTabla = ""
  clientes.forEach(cliente => {
    contenidoTabla += "<tr>" +
      "<td>"+ cliente.cedula +"</td>" +
      "<td>"+ cliente.nombre +"</td>" +
      "<td>"+ cliente.apellido +"</td>" +
      "<td>"+ cliente.ingresos +"</td>" +
      "<td>"+ cliente.egresos +"</td>" +
      "<td>" +
        "<button>Actualizar</button>" +
        "<button button >Eliminar</button > " +
        "</td>"+
      "</tr>"

  });
  cmpTabla.innerHTML = contenidoTabla
}