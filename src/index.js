function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

	const priority = (op) => {
		switch (op) {
			case "+": return 2;
			case "-": return 2;
			case "*": return 3;
			case "/": return 3;
		}
		return -1;
	}

	const createReversePolish = (expr) => {
		let res = [];
		let stack = [];
		
		let indexExpr = 0, indexRes = 0;
		while (indexExpr < expr.length) {
			if (expr[indexExpr] === "(") {
				stack.push(expr[indexExpr]);
			} else if (expr[indexExpr] === ")") {
				do {
					if (!stack.length)  {
						throw new Error("ExpressionError: Brackets must be paired");
					}
					res[indexRes] = stack.pop();
				} while (res[indexRes++] !== "(");
				indexRes--;
			} else if (expr[indexExpr] >= "0" && expr[indexExpr] <= "9") { 
				res[indexRes++] = expr[indexExpr];
			} else if (expr[indexExpr] === " ") { 
				res[indexRes++] = expr[indexExpr];
			} else if (expr[indexExpr] === "+" || expr[indexExpr] === "-" || 
				expr[indexExpr] === "*" || expr[indexExpr] === "/") {
				while (stack.length > 0 && 
					priority(stack[stack.length - 1]) >= priority(expr[indexExpr])) {
					res[indexRes++] = stack.pop();
				}
				stack.push(expr[indexExpr]);
			} else return false;
			indexExpr++;
		}

		while (stack.length > 0) {
			res[indexRes] = stack.pop();
			if (res[indexRes] === "(") {
				throw new Error("ExpressionError: Brackets must be paired");
			}
			indexRes++;
		}

		let arr = [];
		res.forEach(e => {
			if (e === "+" || e === "-" || e === "*" || e === "/") {
				arr.push(" ", e, " ");
			} else {
				arr.push(e);
			}
		});

		return arr.join("").split(" ").filter(e => e !== "");
	}

	const OPERATORS = {
		"+" : ((a, b) => a + b),
		"-" : ((a, b) => a - b),
		"*" : ((a, b) => a * b),
		"/" : ((a, b) => {
			if (b == 0) throw new Error("TypeError: Division by zero.");
			return a / b;
		})
	};
	let stack = [];

	if (expr.length <= 3) {
		expr = expr.split("").join(" ");
	}
	let pol = createReversePolish(expr);

	pol.forEach(element => {
		if (element in OPERATORS) {
			let a = stack.pop();
			let b = stack.pop();
			let res = OPERATORS[element](b, a);
			stack.push(parseFloat(res));
		} else {
			stack.push(+element);
		}
	});

	return stack.pop();
}

module.exports = {
    expressionCalculator
}