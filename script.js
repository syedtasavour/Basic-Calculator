document.addEventListener('DOMContentLoaded', () => {
    const expression = document.getElementById('expression');
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');

    let currentExpression = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            const action = button.dataset.action;

            if (action === 'clear') {
                clear();
            } else if (action === 'calculate') {
                calculate();
            } else if (action === 'operator') {
                appendOperator(value);
            } else if (action === 'decimal') {
                appendDecimal();
            } else if (action === 'backspace') {
                backspace();
            } else if (action === 'negate') {
                negate();
            } else {
                appendNumber(value);
            }

            updateDisplay();
        });
    });

    function clear() {
        currentExpression = '';
        result.value = '';
    }

    function calculate() {
        try {
            const calculatedResult = eval(currentExpression);
            if (!isFinite(calculatedResult)) {
                throw new Error('Invalid calculation');
            }
            result.value = Number(calculatedResult.toFixed(10)).toString().slice(0, 10);
        } catch (error) {
            result.value = 'Error';
        }
    }

    function appendOperator(operator) {
        if (currentExpression && !isNaN(currentExpression[currentExpression.length - 1])) {
            currentExpression += operator;
        }
    }

    function appendDecimal() {
        const lastNumber = currentExpression.split(/[-+*/]/).pop();
        if (!lastNumber.includes('.')) {
            currentExpression += '.';
        }
    }

    function appendNumber(number) {
        currentExpression += number;
    }

    function backspace() {
        currentExpression = currentExpression.slice(0, -1);
    }

    function negate() {
        if (currentExpression) {
            if (currentExpression[0] === '-') {
                currentExpression = currentExpression.slice(1);
            } else {
                currentExpression = '-' + currentExpression;
            }
        }
    }

    function updateDisplay() {
        expression.value = currentExpression;
        if (currentExpression) {
            calculate();
        } else {
            result.value = '';
        }
    }

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (/[0-9]/.test(key)) {
            appendNumber(key);
        } else if (key === '.') {
            appendDecimal();
        } else if (['+', '-', '*', '/'].includes(key)) {
            appendOperator(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Escape') {
            clear();
        } else if (key === 'Backspace') {
            backspace();
        }
        updateDisplay();
    });
});