const answerOutput = document.getElementById("result");
const expressionOutput = document.getElementById("expression");

const clearAllBtn = document.getElementById("clear-history");
const clearScreenBtn = document.getElementById("clear-screen");
const percentModeBtn = document.getElementById("percent");
const numbersBtn = document.querySelectorAll(".number");
const operatorsBtn = document.querySelectorAll(".operator");
const decimalModeBtn = document.getElementById("decimal");
const signModeBtn = document.getElementById("sign");
const equalToBtn = document.getElementById("equal");

let tempNumber, firstNumber, secondNumber,
	operatorClicked, isFirstNumber, isNext;

function clearAll(temp = true, second = true) {
	secondNumber = "";
	isNext = false;
	if (temp) tempNumber = "";
	if (second) {
		firstNumber = operatorClicked = "";
		answerOutput.textContent = expressionOutput.textContent = "";
		isFirstNumber = true;
	}
}
clearAll();

function storeNumber(value) {
	answerOutput.textContent = value;
	if (isFirstNumber) {
		firstNumber = value;

	}
	else {
		secondNumber = value;
	}
}

clearAllBtn.addEventListener("click", clearAll);

clearScreenBtn.addEventListener("click", () => {
	tempNumber = "";
	storeNumber("");
});

percentModeBtn.addEventListener("click", () => {
	tempNumber /= 100;
	storeNumber(tempNumber);
});

add = (a, b) => a + b;
substract = (a, b) => a - b;
multiply = (a, b) => a * b;
divide = (a, b) => a / b;

function evaluate(a, b, opr) {
	const result = window[opr](+a, +b);

	return result.toString().slice(0, 10);
}

numbersBtn.forEach(number => number.onclick = () => {
	if (isNext) clearAll();

	tempNumber += number.id;
	storeNumber(tempNumber);
})

operatorsBtn.forEach(operator => operator.onclick = () => {
	if (!firstNumber) return;
	else if (isNext) clearAll(true, false);
	else if (secondNumber && operatorClicked) {
		firstNumber = evaluate(firstNumber, secondNumber, operatorClicked);
		answerOutput.textContent = firstNumber;
	};
	isFirstNumber = false;
	tempNumber = "";
	operatorClicked = operator.id;
})

equalToBtn.onclick = () => {
	if (firstNumber && secondNumber && operatorClicked) {
		tempNumber = evaluate(firstNumber, secondNumber, operatorClicked);
		answerOutput.textContent = firstNumber = tempNumber;
		isNext = true;
	}
}

decimalModeBtn.onclick = () => {
	if (!tempNumber) tempNumber = '0';
	if (isNext) clearAll(false);
	tempNumber += '.';
	storeNumber(tempNumber);
}

signModeBtn.onclick = () => {
	if (!tempNumber) return;
	if (isNext) clearAll(false);
	const tempArray = tempNumber.split("");

	(tempArray[0] == '-') ? tempArray.shift() : tempArray.unshift('-');
	tempNumber = tempArray.join("");
	storeNumber(tempNumber);
}
