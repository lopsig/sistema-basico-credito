
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
  document.getElementById("creditos").classList.remove("activa");
}

const showSection = (idSection) => {
  hideSection()
  document.getElementById(idSection).classList.add("activa");
}

let tasaConfigurada = false

const guardarTasa = () => {
  let tasa = recuperarFloat("tasaInteres");
  if (tasa<10 || tasa>20)  {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    tasaConfigurada = false
  } else {
    tasaInteres = tasa
    tasaConfigurada = true
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
      "<td>$"+ cliente.ingresos +"</td>" +
      "<td>$"+ cliente.egresos +"</td>" +
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

const buscarClienteCredito = () => {
  document.getElementById("creditoEstado").textContent = "";
  document.getElementById("creditoEstado").className = "";
  document.getElementById("resultadoCredito").textContent = "";
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let clienteExiste = buscarCliente(cedula);
  console.log(clienteExiste)
  let componenteDiv = document.getElementById("datosClienteCredito");
  let contenidoDiv = "";

  if (clienteExiste == null) {
    contenidoDiv = "No existe un cliente con ese número de cédula"
  }
  else {
    contenidoDiv += "<h3>Datos del Cliente</h3>" +
      "<p><strong>Cédula: </strong>"+clienteExiste.cedula+"</p>"+
      "<p><strong>Nombre: </strong>"+clienteExiste.nombre+"</p>"+
      "<p><strong>Apellido: </strong>"+clienteExiste.apellido+"</p>"+
      "<p><strong>Ingresos: </strong>$"+clienteExiste.ingresos+"</p>"+
      "<p><strong>Egresos: </strong>$"+clienteExiste.egresos+"</p>"
  }

  componenteDiv.innerHTML = contenidoDiv
  
}

const calcularCredito = () => {
  let rate = tasaInteres
  if (!tasaConfigurada) {
    alert(
      "Debes configurar la tasa de interés en la sección Parámetros antes de calcular.",
    );
    return;
  }

  let amount = recuperarFloat("montoCredito");
  if (isNaN(amount) || amount <= 0) {
    alert("Debes ingresar un monto válido mayor a cero.");
    return;
  }

  let term = recuperarInt("plazoCredito");
  if (isNaN(term) || term <= 0) {
    alert("Debes ingresar un plazo válido mayor a cero.");
    return;
  }


  let cedula = recuperaraTexto("buscarCedulaCredito");
  let clienteExiste = buscarCliente(cedula);
  let componenteDiv = document.getElementById("resultadoCredito");
  let contenidoDiv = "";

  if (clienteExiste == null) {
    contenidoDiv = "ERROR";
  } else {
    let balance = calculateAvailableBalance(
      clienteExiste.ingresos,
      clienteExiste.egresos,
    );
    let abilityPay = calculateAbilityPay(balance);

    let simpleInterest = calculateSimpleInterest(amount, rate, term);
    let total = calculateTotal(amount, simpleInterest);

    let monthlyPayment = calculateMonthlyPayment(total, term);
    let approveCredits = approveCredit(abilityPay, monthlyPayment);
    showSpanCredit("creditoEstado", approveCredits);

    contenidoDiv +=
      "<p><strong>Capacidad de Pago: </strong>$" +
      abilityPay +
      "</p>" +
      "<p><strong>Total a Pagar: </strong>$" +
      total +
      "</p>" +
      "<p><strong>Cuota Mensual: </strong>$" +
      monthlyPayment +
      "</p>";
  }

  componenteDiv.innerHTML = contenidoDiv;
}