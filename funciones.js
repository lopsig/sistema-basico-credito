// CALCULATE FUNCTIONS
const calculateAvailableBalance = (income, expenses) => {
  let availableBalance = parseFloat(income - expenses).toFixed(2);

  if (availableBalance < 0) {
    return "0.00";
  }

  return availableBalance;
};

const calculateAbilityPay = (availableBalance) => {
  let abilityPay = parseFloat(availableBalance * 0.5).toFixed(2);

  if (abilityPay <= 0) {
    return "0.00";
  }
  return abilityPay;
};

const calculateSimpleInterest = (amount, rate, term) => {
  interestRate = rate / 100;

  let simpleInterest = term * amount * interestRate;

  return simpleInterest;
};

const calculateTotal = (amount, simpleInterest) => {
  let total = amount + simpleInterest + 100;

  return total;
};

const calculateMonthlyPayment = (total, term) => {
  let monthlyTerm = term * 12;
  let monthlyPayment = parseFloat(total / monthlyTerm).toFixed(2);

  return monthlyPayment;
};

const approveCredit = (abilityPay, monthlyPayment) => {
  return parseFloat(abilityPay) > parseFloat(monthlyPayment);
};

//UTIL FUNCTIONS
const recoverText = (idComponent) => {
  let component = document.getElementById(idComponent);
  let value = component.value;

  return value;
};

const recoverFloat = (idComponent) => {
  let valueText = recoverText(idComponent);
  let valueFloat = parseFloat(valueText);

  return valueFloat;
};

const recoverInt = (idComponent) => {
  let valueText = recoverText(idComponent);
  let valueInt = parseInt(valueText);

  return valueInt;
};

const showSpan = (idComponent, value) => {
  let component = document.getElementById(idComponent);
  component.textContent = "USD " + value;
};



const showSpanCredit = (idComponent, value) => {
  let component = document.getElementById(idComponent);
  
  if (value == true) {
    component.textContent = "CRÉDITO APROBADO";
    component.className = "aprobado";
  } else {
    component.textContent = "CRÉDITO RECHAZADO";
    component.className = "rechazado";
  }
};

const clearInput = (idComponent) => {
  document.getElementById(idComponent).value = "";
};

const validateInputs = () => {
  let valid = true;

  const rules = [
    {
      id: "txtIngresos",
      errId: "errIngresos",
      onlyInt: false,
      maxDigits: 5,
    },
    {
      id: "txtEgresos",
      errId: "errEgresos",
      onlyInt: false,
      maxDigits: 5,
    },
    {
      id: "txtMonto",
      errId: "errMonto",
      onlyInt: true,
      maxDigits: 5,
    },
    {
      id: "txtPlazo",
      errId: "errPlazo",
      onlyInt: true,
      maxDigits: 1,
    },
    {
      id: "txtTasaInteres",
      errId: "errTasaInteres",
      onlyInt: true,
      maxDigits: 2,
    },
  ];

  rules.forEach((rule) => {
    const input = document.getElementById(rule.id);
    const errorSpan = document.getElementById(rule.errId);
    const value = input.value.trim();
    let mensaje = "";

    if (value === "") {
      mensaje = "Este campo no puede estar vacío.";
    } else if (rule.onlyInt && !/^\d+$/.test(value)) {
      mensaje = "Solo se permiten números enteros.";
    } else if (!rule.onlyInt && !/^\d+(\.\d+)?$/.test(value)) {
      mensaje = "Solo se permiten números.";
    } else if (parseFloat(value) <= 0) {
      mensaje = "El valor debe ser mayor a cero.";
    } else if (
      value.replace(".", "").replace(/\D/g, "").length > rule.maxDigits
    ) {
      mensaje = `Máximo ${rule.maxDigits} dígito(s) permitido(s).`;
    }

    errorSpan.textContent = mensaje;

    if (mensaje !== "") {
      valid = false;
    }
  });

  return valid;
};

