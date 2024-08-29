const ansOut = document.getElementById("result");

const clearAllBtn = document.getElementById("clear-history");
const clearScreenBtn = document.getElementById("clear-screen");
const percentBtn = document.getElementById("percent");
const numbersBtn = document.querySelectorAll(".number");
const operatorsBtn = document.querySelectorAll(".operator");
const decimalBtn = document.getElementById("decimal");
const signBtn = document.getElementById("sign");
const equalToBtn = document.getElementById("equal");

let tempNum, firstNum, secondNum, opr,
	oprClicked, isFirstNum, isNext;

function clearAll(temp = true, second = true) {
	secondNum = "";
	isNext = false;
	if (temp) tempNum = "";
	if (second) {
		firstNum = oprClicked = "";
		isFirstNum = true;
	}
	ansOut.textContent = "";
}
clearAll();

function storeNum(value) {
	ansOut.textContent = value;
	if (isFirstNum) {
		firstNum = value;
	}
	else {
		secondNum = value;
	}
}

clearAllBtn.addEventListener("click", clearAll);

clearScreenBtn.addEventListener("click", () => {
	tempNum = "";
	storeNum("");
});

percentBtn.addEventListener("click", () => {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	tempNum = evaluate(tempNum, 100, "divide");
	storeNum(tempNum);
});

add = (a, b) => a + b;
substract = (a, b) => a - b;
multiply = (a, b) => a * b;
divide = (a, b) => a / b;

function evaluate(a, b, opr) {
	if (+b === 0 && opr === 'divide') {
		ansOut.textContent = "MATH ERROR";
		return "MATH ERROR";
	}
	let result = window[opr](+a, +b);

	if (result.toString().length >= 10) {
		if (Math.abs(result) < 1 && result != 0) {
			result = result.toFixed(8);
		}
		else {
			if (result >= 0) result = result.toPrecision(5);
			else result = result.toPrecision(4);
		}
	}
	return result.toString();
}

numbersBtn.forEach(number => number.onclick = () => {
	if (isNext) clearAll();

	if (tempNum.length > 8) return;
	tempNum += number.id;
	storeNum(tempNum);
})

operatorsBtn.forEach(operator => operator.onclick = () => {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	opr = operator.textContent;
	if (!firstNum) return;
	else if (isNext) clearAll(true, false);
	else if (secondNum && oprClicked) {
		firstNum = evaluate(firstNum, secondNum, oprClicked);
		if (firstNum === "MATH ERROR") return isNext = true;
		ansOut.textContent = firstNum;
		secondNum = "";
	};

	isFirstNum = false;
	tempNum = "";
	oprClicked = operator.id;
})


equalToBtn.onclick = () => {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	if (firstNum && secondNum && oprClicked) {
		tempNum = evaluate(firstNum, secondNum, oprClicked);
		if (tempNum === "MATH ERROR") return isNext = true;
		ansOut.textContent = firstNum = tempNum;
		isNext = true;
	}
}

decimalBtn.onclick = () => {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	if (!tempNum) tempNum = '0';
	if (isNext) clearAll(false);
	tempNum += '.';
	storeNum(tempNum);
}

signBtn.onclick = () => {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	if (!tempNum) return;
	if (isNext) clearAll(false);
	const tempArray = tempNum.split("");

	(tempArray[0] == '-') ? tempArray.shift() : tempArray.unshift('-');
	tempNum = tempArray.join("");
	storeNum(tempNum);
}
