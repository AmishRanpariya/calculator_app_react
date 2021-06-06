import React, { useEffect } from "react";

import Calc from "../../calc";

const KeyPad = () => {
	useEffect(() => {
		const numberButtons = document.querySelectorAll("[data-number]");
		const operationButtons = document.querySelectorAll("[data-operation]");
		const equalsButton = document.querySelector("[data-equals]");
		const deleteButton = document.querySelector("[data-delete]");
		const allClearButton = document.querySelector("[data-all-clear]");
		const previousOperandTextElement = document.querySelector(
			"[data-previous-operand]"
		);
		const currentOperandTextElement = document.querySelector(
			"[data-current-operand]"
		);

		const calculator = new Calc(
			previousOperandTextElement,
			currentOperandTextElement
		);

		// attaching events
		numberButtons.forEach((button) => {
			button.addEventListener("click", () => {
				calculator.appendNumber(button.getAttribute("data-number"));
				calculator.updateDisplay();
			});
		});

		operationButtons.forEach((button) => {
			button.addEventListener("click", () => {
				calculator.chooseOperation(button.innerText);
				calculator.updateDisplay();
			});
		});

		equalsButton.addEventListener("click", (button) => {
			calculator.compute();
			calculator.updateDisplay();
		});

		allClearButton.addEventListener("click", (button) => {
			calculator.clear();
			calculator.updateDisplay();
		});

		deleteButton.addEventListener("click", (button) => {
			calculator.delete();
			calculator.updateDisplay();
		});

		window.addEventListener("keydown", (e) => {
			e.preventDefault();
			if (e.key.match(/[0-9.]{1}/)) {
				calculator.appendNumber(e.key);
			} else if (e.key.match(/[-*/+]{1}/)) {
				calculator.chooseOperation(e.key);
			} else if (e.key === "Enter") {
				calculator.compute();
			} else if (e.key === "Delete") {
				calculator.clear();
			} else if (e.key === "Backspace") {
				calculator.delete();
			}
			calculator.updateDisplay();
		});

		//to copy result on clipboard by clicking output div
		const output = document.querySelector(".output");
		output.addEventListener("click", () => {
			let temp = document.createElement("input");
			document.body.appendChild(temp);
			temp.value = calculator.getCurrentOperand();
			temp.select();
			document.execCommand("copy");
			temp.remove();
		});
	}, []);

	return (
		<>
			<div className="output">
				<span>
					<span data-previous-operand className="previous-operand"></span>
					<span data-current-operand className="current-operand"></span>
				</span>
			</div>
			<div className="keys">
				<button data-number="7">7</button>
				<button data-number="8">8</button>
				<button data-number="9">9</button>
				<button data-delete className="secondary">
					DEL
				</button>

				<button data-number="4">4</button>
				<button data-number="5">5</button>
				<button data-number="6">6</button>
				<button data-operation>+</button>

				<button data-number="1">1</button>
				<button data-number="2">2</button>
				<button data-number="3">3</button>
				<button data-operation>-</button>

				<button data-number=".">.</button>
				<button data-number="0">0</button>
				<button data-operation>/</button>
				<button data-operation>x</button>

				<button data-all-clear className="span-2 secondary">
					RESET
				</button>
				<button data-equals className="span-2 etc">
					=
				</button>
			</div>
		</>
	);
};

export default KeyPad;
