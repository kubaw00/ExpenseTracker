const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyTransatction = [
//     {id:1, text: 'Camera', amount: -500},
//     {id:2, text: 'Bike', amount: -700},
//     {id:3, text: 'Salary', amount: 1700},
//     {id:4, text: 'Shoes', amount: -100},
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions :[];

function addTransactionDOM(transaction){
    
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML =`
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    
    `;
    list.appendChild(item)
}

// remove transaction 
function removeTransaction(id){

    transactions = transactions.filter(transaction => transaction.id !== id )
    updateLocalStorage()
    init();
}

// update Local Storage
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// add new trasaction

function addTransaction(e) {
    e.preventDefault();

    if(text.value === "" || amount.value === ""){
        alert("Please add text and amount")
    } else {
        
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        }

        transactions.push(transaction);
        addTransactionDOM(transaction)
        updateLocalStorage();
        updateData();

        text.value ="";
        amount.value ="";

    }
}

// generate ID
function generateID(){
    return Math.floor(Math.random() * 10000000)
}


// update balance income & expense
function updateData(){
    const amounts = transactions.map(transaction => transaction.amount)
    
    const total = amounts.reduce((acc, item) => (acc+=item), 0).toFixed(2);
   
   
    const income = amounts.filter(item => item > 0)
                            .reduce((acc, item) => (acc+=item),0)
                            .toFixed(2);
    const expense = (amounts.filter(item => item < 0)
                            .reduce((acc, item) => (acc+=item), 0)*-1)
                            .toFixed(2);            
    money_minus.textContent = `-$${expense}`;                     
    money_plus.textContent = `+$${income}`; 
    balance.textContent = `$${total}`   
                 
}

// init app
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateData();
} 

init();

form.addEventListener('submit', addTransaction)