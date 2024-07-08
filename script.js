document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to render expenses
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('card', 'mb-2');
            expenseItem.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${expense.name}</h5>
                    <p class="card-text">₹${expense.amount.toFixed(2)}</p>
                    <button type="button" class="btn btn-info mr-2" onclick="editExpense(${index})">Edit</button>
                    <button type="button" class="btn btn-danger" onclick="deleteExpense(${index})">Delete</button>
                </div>
            `;
            expenseList.appendChild(expenseItem);
        });
    }
    
    // Function to handle form submission
    expenseForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('expense-name').value.trim();
        const amount = document.getElementById('expense-amount').value.trim();
        if (name && amount) {
            const expense = {
                name: name,
                amount: parseFloat(amount)
            };
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseForm.reset();
        } else {
            alert('Please enter both expense name and amount.');
        }
    });

    // Function to handle editing an expense
    window.editExpense = index => {
        const newAmount = prompt('Enter new amount:', expenses[index].amount.toFixed(2));
        if (newAmount !== null && !isNaN(parseFloat(newAmount))) {
            expenses[index].amount = parseFloat(newAmount);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        } else if (newAmount !== null) {
            alert('Invalid amount. Please enter a valid number.');
        }
    };

    // Function to handle deleting an expense
    window.deleteExpense = index => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    // Initial render of expenses
    renderExpenses();
});
