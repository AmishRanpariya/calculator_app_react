export default class Calc {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
		this.precision = 10;
	}

	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}

	delete() {
		//deleting current operand first
		if (this.currentOperand !== "") {
			this.currentOperand = this.currentOperand.toString().slice(0, -1);
		}

		//if no first operand then operation
		else if (this.operation !== "") {
			this.currentOperand = this.previousOperand;
			this.previousOperand = "";
			this.operation = undefined;
		}
		//if no operation defined then previousoperand
		else {
			this.previousOperand = this.previousOperand.toString().slice(0, -1);
		}
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) {
			//if already '.' exist then don't append it.
			return;
		}
		if (
			this.currentOperand.includes(".") &&
			this.currentOperand.length - this.currentOperand.indexOf(".") >
				this.precision
		) {
			return;
		}
		//else append to currentoperand
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		//checking for operand.
		//if null then return.
		//else going to make it previousoperand
		if (this.currentOperand === "") {
			this.operation = operation;
			return;
		}

		//doing this if user want to calculate without pressing '='
		//for example 1+2*3+4/2...
		if (this.previousOperand !== "") {
			this.compute();
		}

		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(current)) {
			return;
		}

		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "x":
				computation = prev * current;
				break;
			case "/":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = computation.toPrecision(this.precision);
		this.operation = undefined;
		this.previousOperand = "";
	}

	getDisplayNumber(number) {
		//for formatting the number.
		const stringNumber = number.toString();

		//taking only part before '.'
		const integerDigits = parseFloat(stringNumber.split(".")[0]);

		//taking only part after '.'
		const decimalDigits = stringNumber.split(".")[1];

		let integerDisplay;

		//checking for case of .000292 something number which don't have integer part.
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			//making proper format with ','
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		//checking case of no fractional part.
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		//displaying formated string
		this.currentOperandTextElement.innerText =
			" " + this.getDisplayNumber(this.currentOperand);

		//here printing previous operand only if the operation is defined.
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = "";
		}
	}

	getCurrentOperand() {
		return this.currentOperand;
	}
}
