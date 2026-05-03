
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
  let tasa = recuperarFloat("tasaInteres");
  if (tasa<10 || tasa>20)  {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  } else {
    mostrarTexto("mensajeTasa", `Tasa configurada correctamente: ${tasa}%`);
  }
}

const limpiar = () => {
  limpiarTextoEnCaja("inputCedula")
  limpiarTextoEnCaja("inputNombre")
  limpiarTextoEnCaja("inputApellido")
  limpiarTextoEnCaja("inputIngresos")
  limpiarTextoEnCaja("inputEgresos")
}



const guardarCliente = () => {
  let cedula = recuperaraTexto("inputCedula");
  let nombre = recuperaraTexto("inputNombre");
  let apellido = recuperaraTexto("inputApellido");
  let ingresos = recuperarFloat("inputIngresos");
  let egresos = recuperarFloat("inputEgresos");
  
  let verificarCliente = buscarCliente(cedula)
  let nuevoCliente = {};

  if (verificarCliente == null) {
      nuevoCliente.cedula = cedula;
      nuevoCliente.nombre = nombre;
      nuevoCliente.apellido = apellido;
      nuevoCliente.ingresos = ingresos;
    nuevoCliente.egresos = egresos;
    clientes.push(nuevoCliente);
    
  } else {
    verificarCliente.nombre = nombre
    verificarCliente.apellido = apellido
    verificarCliente.ingresos = ingresos
    verificarCliente.egresos = egresos
  }

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
        "<button onclick = seleccionarCliente("+cliente.cedula+")>Actualizar</button>" +
        "<button button >Eliminar</button > " +
        "</td>"+
      "</tr>"

  });
  cmpTabla.innerHTML = contenidoTabla
}

const buscarCliente = (cedula) => {
  let clienteEncontrado = null
  clientes.forEach(cliente => {
    if (cliente.cedula == cedula) {
      clienteEncontrado = cliente
    }
  });
  return clienteEncontrado
}

const seleccionarCliente = (cedula) => {
  let clienteSeleccionado = buscarCliente(cedula)
  mostrarTextoEnCaja("inputCedula",clienteSeleccionado.cedula)
  mostrarTextoEnCaja("inputNombre",clienteSeleccionado.nombre)
  mostrarTextoEnCaja("inputApellido",clienteSeleccionado.apellido)
  mostrarTextoEnCaja("inputIngresos",clienteSeleccionado.ingresos)
  mostrarTextoEnCaja("inputEgresos",clienteSeleccionado.egresos)
}