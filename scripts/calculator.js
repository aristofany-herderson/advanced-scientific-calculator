const inputElement = document.querySelector(".input");
const outputOperationElement = document.querySelector(".operation .value");
const outputResultElement = document.querySelector(".result .value");

const OPERATIONS = ["+", "-", "*", "/"];
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL";
const data = {
  operation: [],
  formula: [],
};
const calculatorButtons = [
  {
    name: "rad",
    symbol: "rad",
    formula: false,
    type: "key",
  },
  {
    name: "deg",
    symbol: "deg",
    formula: false,
    type: "key",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigonometric_function",
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigonometric_function",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigonometric_function",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "mathematic_function",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },
  {
    name: "asin",
    symbol: "sin<span>-1</span>",
    formula: "inverseTrigo(Math.asin,",
    type: "trigonometric_function",
  },
  {
    name: "acos",
    symbol: "cos<span>-1</span>",
    formula: "inverseTrigo(Math.acos,",
    type: "trigonometric_function",
  },
  {
    name: "atan",
    symbol: "tan<span>-1</span>",
    formula: "inverseTrigo(Math.atan,",
    type: "trigonometric_function",
  },
  {
    name: "power",
    symbol: "×<span>y</span>",
    formula: POWER,
    type: "mathematic_function",
  },
  {
    name: "log",
    symbol: "lg",
    formula: "Math.log10",
    type: "mathematic_function",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "mathematic_function",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "mathematic_function",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "factorial",
    symbol: "×!",
    formula: FACTORIAL,
    type: "mathematic_function",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "square",
    symbol: "×<span>2</span>",
    formula: POWER,
    type: "mathematic_function",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "00",
    symbol: "00",
    formula: "00",
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
];

const createCalculatorInputs = () => {
  calculatorButtons.forEach((button) => {
    inputElement.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
  });
};
createCalculatorInputs();

let RADIAN = true;

const radianButton = document.getElementById("rad");
const degreesButton = document.getElementById("deg");

radianButton.classList.add("active-angle");

inputElement.addEventListener("click", (event) => {
  const targetButton = event.target;

  calculatorButtons.forEach((button) => {
    if (button.name == targetButton.id) calculator(button);
    updateOutputOperation(data.operation.join(""));
    updateParenthesesCount();
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  calculatorButtons.forEach((button) => {
    console.log(key);
    if (
      (button.type == "number" || button.type == "operator") &&
      button.formula == key
    )
      calculator(button);
    if (button.name == "calculate" && key == "enter") calculateResult();
    if (button.name == "delete" && key == "backspace") deleteLatestOperation();

    updateOutputOperation(data.operation.join(""));
    updateParenthesesCount();
  });
});

const calculator = (button) => {
  if (button.type == "operator" || button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);

    return;
  }

  if (button.type == "trigonometric_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);

    return;
  }

  if (button.type == "mathematic_function") {
    if (button.name == "factorial") {
      const symbol = "!";
      const formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "power") {
      const symbol = "^(";
      const formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "square") {
      const symbol = "^(";
      const formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);

      data.operation.push("2)");
      data.formula.push("2)");
    } else {
      const symbol = button.symbol + "(";
      const formula = button.formula + "(";

      data.operation.push(symbol);
      data.formula.push(formula);
    }

    return;
  }

  if (button.type == "key") {
    if (button.name == "clear") {
      data.operation.splice(0, data.operation.length);
      data.formula.splice(0, data.formula.length);

      updateOutputResult(0);
      updateParenthesesCount();
    } else if (button.name == "delete") {
      deleteLatestOperation();
    } else if (button.name == "rad") {
      RADIAN = true;

      radianButton.classList.add("active-angle");
      degreesButton.classList.remove("active-angle");
    } else if (button.name == "deg") {
      RADIAN = false;

      radianButton.classList.remove("active-angle");
      degreesButton.classList.add("active-angle");
    }
    return;
  }

  if (button.type == "calculate") {
    calculateResult();
    return;
  }
};

const deleteLatestOperation = () => {
  data.operation.pop();
  data.formula.pop();

  updateParenthesesCount();
};

const calculateResult = () => {
  let formulaString = data.formula.join("");

  let POWERSEARCHRESULT = search(data.formula, POWER);
  let FACTORIALSEARCHRESULT = search(data.formula, FACTORIAL);

  const BASES = powerBaseGetter(data.formula, POWERSEARCHRESULT);
  BASES.forEach((base) => {
    let toReplace = base + POWER;
    let replacement = "Math.pow(" + base + ",";

    formulaString = formulaString.replace(toReplace, replacement);
  });

  const NUMBERS = factorialNumberGetter(data.formula, FACTORIALSEARCHRESULT);
  NUMBERS.forEach((factorial) => {
    formulaString = formulaString.replace(
      factorial.toReplace,
      factorial.replacement
    );
  });

  let result;
  try {
    result = eval(formulaString);

    if (data.formula.length == 0) {
      result = 0;
      updateOutputResult(result);

      return;
    }

    if (isNaN(result)) {
      result = "Math Error!";
      updateOutputResult(result);

      return;
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      result = "Syntax Error!";
      updateOutputResult(result);
      return;
    }
  }

  ans = result;
  data.operation = [result];
  data.formula = [result];
  updateOutputResult(result);
  updateParenthesesCount();
};

const updateParenthesesCount = () => {
  const operationString = data.operation.join("");
  const openCount = (operationString.match(/\(/g) || []).length;
  const closeCount = (operationString.match(/\)/g) || []).length;
  const remaining = openCount - closeCount;

  const openParenthesisButton = document.getElementById("open-parenthesis");

  if (remaining > 0) {
    openParenthesisButton.setAttribute("data-count", remaining);
  } else {
    openParenthesisButton.removeAttribute("data-count");
  }
};

const powerBaseGetter = (formula, POWERSEARCHRESULT) => {
  let powerBases = [];

  POWERSEARCHRESULT.forEach((powerIndex) => {
    let base = [];
    let parenthesisCount = 0;

    let previousIndex = powerIndex - 1;
    while (previousIndex >= 0) {
      if (formula[previousIndex] == "(") parenthesisCount--;
      if (formula[previousIndex] == ")") parenthesisCount++;

      let isOperator = false;
      OPERATIONS.forEach((OPERATOR) => {
        if (formula[previousIndex] == OPERATOR) isOperator = true;
      });

      let isPower = formula[previousIndex] == POWER;

      if ((isOperator && parenthesisCount == 0) || isPower) break;

      base.unshift(formula[previousIndex]);
      previousIndex--;
    }
    powerBases.push(base.join(""));
  });
  return powerBases;
};

const factorialNumberGetter = (formula, FACTORIALSEARCHRESULT) => {
  let numbers = [];
  let factorialSequence = 0;

  FACTORIALSEARCHRESULT.forEach((factorialIndex) => {
    let number = [];

    let nextIndex = factorialIndex + 1;
    let nextInput = formula[nextIndex];

    if (nextInput == FACTORIAL) {
      factorialSequence += 1;
      return;
    }

    let firstFactorialIndex = factorialIndex - factorialSequence;

    let previousIndex = firstFactorialIndex - 1;
    let parenthesisCount = 0;
    while (previousIndex >= 0) {
      if (formula[previousIndex] == "(") parenthesisCount--;
      if (formula[previousIndex] == ")") parenthesisCount++;

      let isOperator = false;
      OPERATIONS.forEach((OPERATOR) => {
        if (formula[previousIndex] == OPERATOR) isOperator = true;
      });

      if (isOperator && parenthesisCount == 0) break;

      number.unshift(formula[previousIndex]);
      previousIndex--;
    }
    let numberString = number.join("");
    const factorial = "factorial(";
    const closeParenthesis = ")";
    let times = factorialSequence + 1;

    let toReplace = numberString + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + numberString + closeParenthesis.repeat(times);

    numbers.push({
      toReplace,
      replacement,
    });

    factorialSequence = 0;
  });

  return numbers;
};

const search = (array, keyword) => {
  let searchResult = [];

  array.forEach((element, index) => {
    if (element == keyword) searchResult.push(index);
  });

  return searchResult;
};

const updateOutputOperation = (operation) => {
  outputOperationElement.innerHTML = operation;
};

const updateOutputResult = (result) => {
  outputResultElement.innerHTML = result;
};

const factorial = (number) => {
  if (number % 1 != 0) return gamma(number + 1);
  if (number === 0 || number === 1) return 1;

  let result = 1;
  for (let index = 1; index <= number; index++) {
    result *= index;
    if (result === Infinity) return Infinity;
  }

  return result;
};

const gamma = (n) => {
  var g = 7,
    p = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
};

const trigo = (callback, angle) => {
  const finalAngle = !RADIAN ? (angle * Math.PI) / 180 : angle;

  return callback(finalAngle);
};

const inverseTrigo = (callback, value) => {
  let angle = callback(value);
  const finalAngle = !RADIAN ? (angle * 180) / Math.PI : angle;

  return finalAngle;
};
