document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            const action = button.dataset.action;

            if (action === 'clear') {
                clear();
            } else if (action === 'calculate') {
                calculate();
            } else if (action === 'operator') {
                handleOperator(value);
            } else if (action === 'decimal') {
                appendDecimal();
            } else {
                appendNumber(value);
            }

            updateDisplay();
        });
    });

    function clear() {
        currentInput = '';
        currentOperator = '';
        previousInput = '';
    }

    function calculate() {
        if (currentInput && currentOperator && previousInput) {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            switch (currentOperator) {
                case '+':
                    currentInput = (prev + current).toString();
                    break;
                case '-':
                    currentInput = (prev - current).toString();
                    break;
                case '*':
                    currentInput = (prev * current).toString();
                    break;
                case '/':
                    if (current === 0) {
                        currentInput = 'Error';
                    } else {
                        currentInput = (prev / current).toString();
                    }
                    break;
            }

            currentOperator = '';
            previousInput = '';
        }
    }

    function handleOperator(operator) {
        if (currentInput) {
            if (currentOperator && previousInput) {
                calculate();
            } else {
                previousInput = currentInput;
            }
            currentOperator = operator;
            currentInput = '';
        }
    }

    function appendDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function appendNumber(number) {
        currentInput += number;
    }

    function updateDisplay() {
        result.value = currentInput || '0';
    }

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (/[0-9]/.test(key)) {
            appendNumber(key);
        } else if (key === '.') {
            appendDecimal();
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleOperator(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Escape') {
            clear();
        }
        updateDisplay();
    });
});