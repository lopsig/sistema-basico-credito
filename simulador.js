const calculate = () => {
  if (!validateInputs()) return;

  let income = recoverFloat("txtIngresos");
  let expenses = recoverFloat("txtEgresos");

  let balance = calculateAvailableBalance(income, expenses);

  showSpan("spnDisponible", balance);

  let abilityPay = calculateAbilityPay(balance);

  showSpan("spnCapacidadPago", abilityPay);

  let amount = recoverInt("txtMonto");
  let rate = recoverInt("txtTasaInteres");
  let term = recoverInt("txtPlazo");

  let simpleInterest = calculateSimpleInterest(amount, rate, term);
  showSpan("spnInteresPagar", simpleInterest);

  let total = calculateTotal(amount, simpleInterest);
  showSpan("spnTotalPrestamo", total);

  let monthlyPayment = calculateMonthlyPayment(total, term);
  showSpan("spnCuotaMensual", monthlyPayment);

  let approveCredits = approveCredit(abilityPay, monthlyPayment);
  console.log(approveCredits);
  showSpanCredit("spnEstadoCredito", approveCredits);
};

const restart = () => {
  // Limpiar inputs
  clearInput("txtIngresos");
  clearInput("txtEgresos");
  clearInput("txtMonto");
  clearInput("txtPlazo");
  clearInput("txtTasaInteres");

  // Limpiar resultados
  document.getElementById("spnDisponible").textContent = "—";
  document.getElementById("spnCapacidadPago").textContent = "—";
  document.getElementById("spnInteresPagar").textContent = "—";
  document.getElementById("spnTotalPrestamo").textContent = "—";
  document.getElementById("spnCuotaMensual").textContent = "—";

  // Resetear estado de crédito
  const badge = document.getElementById("spnEstadoCredito");
  badge.textContent = "ANALIZANDO...";
  badge.className = "estado-badge";

  // Limpiar mensajes de error
  document.getElementById("errIngresos").textContent = "";
  document.getElementById("errEgresos").textContent = "";
  document.getElementById("errMonto").textContent = "";
  document.getElementById("errPlazo").textContent = "";
  document.getElementById("errTasaInteres").textContent = "";
};
