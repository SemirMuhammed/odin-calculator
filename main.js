const ansOut = document.getElementById("result");
const clearAllBtn = document.getElementById("clear-history");
const clearScreenBtn = document.getElementById("clear-screen");
const percentBtn = document.getElementById("percent");
const numbersBtn = document.querySelectorAll(".number");
const operatorsBtn = document.querySelectorAll(".operator");
const decimalBtn = document.getElementById("decimal");
const signBtn = document.getElementById("sign");
const equalToBtn = document.getElementById("equal");

let tempNum, firstNum, secondNum, oprClicked, isFirstNum, isNext;

clearAll();
numbersBtn.forEach(num => num.onclick = () => getNum(num.id));
operatorsBtn.forEach(opr => opr.onclick = () => getOpr(opr.id));
equalToBtn.onclick = getAns;
clearAllBtn.onclick = clearAll;
clearScreenBtn.onclick = getClear;
percentBtn.onclick = getPercent;
signBtn.onclick = getSign;
decimalBtn.onclick = getDecimal;

window.addEventListener("keydown", (event) => {
	const nums = "0123456789";
	const oprs = {
		'+': 'add',
		"-": "substract",
		"*": "multiply",
		"/": "divide",
	};

	if (nums.includes(event.key)) getNum(event.key);
	if (oprs[event.key]) getOpr(oprs[event.key]);
	if (event.key === "Enter" || event.key === "=") getAns();
	if (event.key === ".") getDecimal();
	if (event.key === "%") getPercent();
	if (event.key === " ") getSign();
	if (event.key === "Delete") clearAll();
	if (event.key === "Backspace") getClear();
})

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

function storeNum(value) {
	ansOut.textContent = value;
	if (isFirstNum) {
		firstNum = value;
	}
	else {
		secondNum = value;
	}
}


function getClear() {
	tempNum = "";
	storeNum("");
}

function getPercent() {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	if (!tempNum || tempNum === '0' || tempNum === '0.') return;
	tempNum = evaluate(tempNum, 100, "divide");
	storeNum(tempNum);
}

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

	if (result.toString().length > 10) {
		if (Math.abs(result) < 1 && result != 0) {
			if (result < 0) result = result.toFixed(7);
			else result = result.toFixed(8);
		}
		else {
			if (result >= 0) result = result.toPrecision(5);
			else result = result.toPrecision(4);
		}
	}
	return result.toString();
}

function getNum(input) {
	if (isNext) clearAll();

	if (tempNum.length > 8) return;

	if (tempNum === '0') {
		if (input === '0') return;
		tempNum = "";
	};

	tempNum += input;
	storeNum(tempNum);
};

function getOpr(input) {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
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
	oprClicked = input;
}

function getAns() {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	if (firstNum && secondNum && oprClicked) {
		tempNum = evaluate(firstNum, secondNum, oprClicked);
		if (tempNum === "MATH ERROR") return isNext = true;
		ansOut.textContent = firstNum = tempNum;
		isNext = true;
	}
}

function getDecimal() {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	if (tempNum.includes(".")) return;
	if (!tempNum) tempNum = '0';
	if (isNext) clearAll(false);
	tempNum += '.';
	storeNum(tempNum);
}

function getSign() {
	if (firstNum === "MATH ERROR" || tempNum === "MATH ERROR") return;
	if (!tempNum || tempNum === '0' || tempNum === '0.') return;
	if (isNext) clearAll(false);
	tempNum = evaluate(tempNum, -1, "multiply");
	storeNum(tempNum);
}

