const ledgerTableBody = document.getElementById('ledgerTableBody');
const changeButton = document.getElementById('changeButton');
const addButton = document.getElementById('addButton');

// Function to add a new row to the table
function addRow(name, date, amount) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${date}</td>
        <td>${amount}</td>
        <td><button class="delete-button">Delete</button></td>
    `;
    ledgerTableBody.appendChild(newRow);

    // Add event listener to the delete button
    newRow.querySelector('.delete-button').addEventListener('click', () => {
        ledgerTableBody.removeChild(newRow);
        calculateTotal();
    });
}

// Function to change an existing row based on the name
function changeRow(name, newDate, newAmount) {
    const rows = ledgerTableBody.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowName = row.querySelector('td:first-child').textContent;
        if (rowName === name) {
            row.querySelector('td:nth-child(2)').textContent = newDate;
            row.querySelector('td:nth-child(3)').textContent = newAmount;
            break;
        }
    }
}

// Event listener for the "Add New" button
addButton.addEventListener('click', () => {
    let  newName = document.getElementById('newName');
    let  newDate = document.getElementById('newDate');
    let  newAmount = document.getElementById('newAmount');
    addRow(newName.value, newDate.value, newAmount.value);
    calculateTotal();
    newName.value=""; 
    newDate.value="";
    newAmount.value="";
});

// Event listener for the "Change" button
changeButton.addEventListener('click', () => {
    const changeName = document.getElementById('changeName').value;
    const changeDate = document.getElementById('changeDate').value;
    const changeAmount = document.getElementById('changeAmount').value;
    changeRow(changeName, changeDate, changeAmount);
    calculateTotal();

});

function calculateTotal() {
    const rows = ledgerTableBody.querySelectorAll('tr');
    let totalAmount = 0;

    for (let i = 0; i < rows.length; i++) {
        const amountCell = rows[i].querySelector('td:nth-child(3)');
        const amount = parseFloat(amountCell.textContent);
        if (!isNaN(amount)) {
            totalAmount += amount;
        }
    }

    // Update the total amount in the tfoot section
    const totalRow = document.querySelector('tfoot tr');
    const totalCell = totalRow.querySelector('td');
    totalCell.textContent = `Total: ${totalAmount.toFixed(2)}`;
}