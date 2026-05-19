let clientes = [];
let creditos = [];
let creditosVip = []

let tasaInteres = 15;
let clienteSeleccionado = null;
let monthlyPayment = 0;
let amount = 0;
let term = 0;
let creditoAprobado = false;

let tasaConfigurada = false;
let montoMaximoConfigurado = false

const hideSection = () => {
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("creditos").classList.remove("activa");
  document.getElementById("listaCreditos").classList.remove("activa");
  document.getElementById("creditoVip").classList.remove("activa");
  document.getElementById("acercaDe").classList.remove("activa");
};

const showSection = (idSection) => {
  hideSection();
  document.getElementById(idSection).classList.add("activa");
};

const guardarTasa = () => {
  let tasa = recuperarFloat("tasaInteres");
  if (tasa < 10 || tasa > 20) {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    tasaConfigurada = false;
  } else {
    tasaInteres = tasa;
    tasaConfigurada = true;
    mostrarTexto("mensajeTasa", `Tasa configurada correctamente: ${tasa}%`);
  }
  console.log(tasa);
};

const montoMaximo = () => {
  let montoMaximo = recuperarFloat("montoMaximo");
  if (montoMaximo < 100 || montoMaximo > 10000) {
    mostrarTexto("mensajeMontoMaximo", "Solo se permiten montos mínimos de $100 y máximos de $10000");
    montoMaximoConfigurado = false
    limpiarTextoEnCaja("montoMaximo")
  } else {
    amount = montoMaximo
    montoMaximoConfigurado = true
    mostrarTexto(
      "mensajeMontoMaximo", `Monto configurado correctamente:$${montoMaximo}`,
    );
    console.log(amount)
  }
}

const limpiar = () => {
  limpiarTextoEnCaja("inputCedula");
  limpiarTextoEnCaja("inputNombre");
  limpiarTextoEnCaja("inputApellido");
  limpiarTextoEnCaja("inputEmail");
  limpiarTextoEnCaja("inputTelefono");
  limpiarTextoEnCaja("inputIngresos");
  limpiarTextoEnCaja("inputEgresos");
};

const guardarCliente = () => {
  let cedula = recuperaraTexto("inputCedula");
  let nombre = recuperaraTexto("inputNombre");
  let apellido = recuperaraTexto("inputApellido");
  let email = recuperaraTexto("inputEmail");
  let telefono = recuperaraTexto("inputTelefono");
  let ingresos = recuperarFloat("inputIngresos");
  let egresos = recuperarFloat("inputEgresos");

  let verificarCliente = buscarCliente(cedula);
  let nuevoCliente = {};

  if (verificarCliente == null) {
    nuevoCliente.cedula = cedula;
    nuevoCliente.nombre = nombre;
    nuevoCliente.apellido = apellido;
    nuevoCliente.email = email;
    nuevoCliente.telefono = telefono;
    nuevoCliente.ingresos = ingresos;
    nuevoCliente.egresos = egresos;
    clientes.push(nuevoCliente);
  } else {
    verificarCliente.nombre = nombre;
    verificarCliente.apellido = apellido;
    verificarCliente.email = email;
    verificarCliente.telefono = telefono;
    verificarCliente.ingresos = ingresos;
    verificarCliente.egresos = egresos;
  }

  pintarClientes();
};

const pintarClientes = () => {
  let cmpTabla = document.getElementById("tablaClientes");
  let contenidoTabla = "";
  clientes.forEach((cliente) => {
    contenidoTabla +=
      "<tr>" +
      "<td>" +
      cliente.cedula +
      "</td>" +
      "<td>" +
      cliente.nombre +
      "</td>" +
      "<td>" +
      cliente.apellido +
      "</td>" +
      "<td>" +
      cliente.email +
      "</td>" +
      "<td>" +
      cliente.telefono +
      "</td>" +
      "<td>$" +
      cliente.ingresos +
      "</td>" +
      "<td>$" +
      cliente.egresos +
      "</td>" +
      "<td>" +
      "<button onclick = seleccionarCliente(" +
      cliente.cedula +
      ")>Actualizar</button>" +
      "<button onclick = eliminarCliente(" +
      cliente.cedula +
      ")>Eliminar</button > " +
      "</td>" +
      "</tr>";
  });
  cmpTabla.innerHTML = contenidoTabla;
};

const buscarCliente = (cedula) => {
  let clienteEncontrado = null;
  clientes.forEach((cliente) => {
    if (cliente.cedula == cedula) {
      clienteEncontrado = cliente;
    }
  });
  return clienteEncontrado;
};

const seleccionarCliente = (cedula) => {
  let clienteSeleccionado = buscarCliente(cedula);
  mostrarTextoEnCaja("inputCedula", clienteSeleccionado.cedula);
  mostrarTextoEnCaja("inputNombre", clienteSeleccionado.nombre);
  mostrarTextoEnCaja("inputApellido", clienteSeleccionado.apellido);
  mostrarTextoEnCaja("inputEmail", clienteSeleccionado.email);
  mostrarTextoEnCaja("inputTelefono", clienteSeleccionado.telefono);
  mostrarTextoEnCaja("inputIngresos", clienteSeleccionado.ingresos);
  mostrarTextoEnCaja("inputEgresos", clienteSeleccionado.egresos);
};

const buscarClienteCredito = () => {
  document.getElementById("creditoEstado").textContent = "";
  document.getElementById("creditoEstado").className = "";
  document.getElementById("resultadoCredito").textContent = "";

  let cedula = recuperaraTexto("buscarCedulaCredito");
  let clienteExiste = buscarCliente(cedula);
  console.log(clienteExiste);
  let componenteDiv = document.getElementById("datosClienteCredito");
  let contenidoDiv = "";

  if (clienteExiste == null) {
    contenidoDiv = "No existe un cliente con ese número de cédula";
  } else {
    contenidoDiv +=
      "<h3>Datos del Cliente</h3>" +
      "<p><strong>Cédula: </strong>" +
      clienteExiste.cedula +
      "</p>" +
      "<p><strong>Nombre: </strong>" +
      clienteExiste.nombre +
      "</p>" +
      "<p><strong>Apellido: </strong>" +
      clienteExiste.apellido +
      "</p>" +
      "<p><strong>Ingresos: </strong>$" +
      clienteExiste.ingresos +
      "</p>" +
      "<p><strong>Egresos: </strong>$" +
      clienteExiste.egresos +
      "</p>";
  }

  componenteDiv.innerHTML = contenidoDiv;
  console.log(amount)
};

const calcularCredito = () => {
  let rate = tasaInteres;
  if (!tasaConfigurada) {
    alert(
      "Debes configurar la tasa de interés en la sección Parámetros antes de calcular.",
    );
    return;
  }

  // amount = recuperarFloat("montoCredito");
  // if (isNaN(amount) || amount <= 0) {
  //   alert("Debes ingresar un monto válido mayor a cero.");
  //   return;
  // }

  term = recuperarInt("plazoCredito");
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

    monthlyPayment = calculateMonthlyPayment(total, term);
    let approveCredits = approveCredit(abilityPay, monthlyPayment);
    showSpanCredit("creditoEstado", approveCredits);

    let applyCreditButton = document.getElementById("btnSolicitarCredito");

    if (approveCredits) {
      applyCreditButton.disabled = false;
    } else {
      applyCreditButton.disabled = true;
    }

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
};

const solicitarCredito = () => {
  let cedula = recuperaraTexto("buscarCedulaCredito");
  let clienteExiste = buscarCliente(cedula);


  let credito = {
    cedula: clienteExiste.cedula,
    nombre: clienteExiste.nombre,
    apellido: clienteExiste.apellido,
    monto: amount,
    tasa: tasaInteres,
    plazo: term,
    cuota: monthlyPayment,
  };

  if (credito.monto > 5000) {
    creditosVip.push(credito)
    creditos.push(credito)
    console.log(creditosVip)
  } else {
    creditos.push(credito);
    console.log(creditos);
  }
  document.getElementById("btnSolicitarCredito").disabled = true;
};

const buscarCreditos = (cedula) => {
  let creditoEncontrado = [];
  creditos.forEach((credito) => {
    if (credito.cedula == cedula) {
      creditoEncontrado.push(credito);
    }
  });
  return creditoEncontrado;
};
const buscarCreditosVip = (cedula) => {
  let creditoEncontrado = [];
  creditosVip.forEach((credito) => {
    if (credito.cedula == cedula) {
      creditoEncontrado.push(credito);
    }
  });
  return creditoEncontrado;
};

const pintarCreditos = (creditosEncontrados) => {
  let cmpTabla = document.getElementById("tablaCreditos");
  let contenidoTabla = "";

  creditosEncontrados.forEach((credito) => {
    contenidoTabla +=
      "<tr>" +
      "<td>" +
      credito.cedula +
      "</td>" +
      "<td>" +
      credito.nombre +
      "</td>" +
      "<td>" +
      credito.apellido +
      "</td>" +
      "<td>$" +
      credito.monto +
      "</td>" +
      "<td>" +
      credito.tasa +
      "%</td>" +
      "<td>" +
      credito.plazo +
      " años</td>" +
      "<td>$" +
      credito.cuota +
      "</td>" +
      "<td>" +
      "<button onclick='eliminarCredito(" +
      creditos.indexOf(credito) +
      ")'>Eliminar</button>" +
      "</td>" +
      "</tr>";
  });
  cmpTabla.innerHTML = contenidoTabla;
};
const pintarCreditosVip = (creditosEncontrados) => {
  let cmpTabla = document.getElementById("tablaCreditosVip");
  let contenidoTabla = "";

  creditosEncontrados.forEach((credito) => {
    contenidoTabla +=
      "<tr>" +
      "<td>" +
      credito.cedula +
      "</td>" +
      "<td>" +
      credito.nombre +
      "</td>" +
      "<td>" +
      credito.apellido +
      "</td>" +
      "<td>$" +
      credito.monto +
      "</td>" +
      "<td>" +
      credito.tasa +
      "%</td>" +
      "<td>" +
      credito.plazo +
      " años</td>" +
      "<td>$" +
      credito.cuota +
      "</td>" +
      "<td>" +
      "<button onclick='eliminarCreditoVip(" +
      creditosVip.indexOf(credito) +
      ")'>Eliminar</button>" +
      "</td>" +
      "</tr>";
  });
  cmpTabla.innerHTML = contenidoTabla;
};

const buscarCreditosCliente = () => {
  let cedula = recuperaraTexto("buscarCedulaListado");
  let creditosCliente = buscarCreditos(cedula);
  console.log(creditosCliente);
  pintarCreditos(creditosCliente);
};
const buscarCreditosVipCliente = () => {
  let cedula = recuperaraTexto("buscarCedulaListadoVip");
  let creditosCliente = buscarCreditosVip(cedula);
  console.log(creditosCliente);
  pintarCreditosVip(creditosCliente);
};

///Funciones que no se mencionaban en los PDFs

const eliminarCliente = (cedula) => {
  let confirmar = confirm("Estas seguro de que deseas eliminar este cliente?")
  if (!confirmar) return
  
  let indice = clientes.findIndex(cliente => cliente.cedula == cedula)
  clientes.splice(indice, 1);
  console.log(clientes);

  pintarClientes();
};

const eliminarCredito = (indice) => {
  let confirmar = confirm("Estas seguro de que deseas eliminar este Credito?");
  if (!confirmar) return
  
  creditos.splice(indice, 1);
  pintarCreditos(creditos);
};
const eliminarCreditoVip = (indice) => {
  let confirmar = confirm("Estas seguro de que deseas eliminar este Credito?");
  if (!confirmar) return
  
  creditosVip.splice(indice, 1);
  pintarCreditosVip(creditosVip);
};