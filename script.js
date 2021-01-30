const Modal = {
    // Abrir modal
    open(){
        document.querySelector(".modal-overlay").classList.add("active")
    }
    ,
    // Fechar modal 
    close(){
        document.querySelector(".modal-overlay").classList.remove("active")
    }
}

const transactions = [
    {
        id: 1,
        description: "Aluguel",
        amount: -100000,
        date: "05/01/2021",
    },
    {
        id: 2,
        description: "Salário",
        amount: 500000,
        date: "19/01/2021",
    },
    {
        id: 3,
        description: "Equipamento p/ setup",
        amount: -100000,
        date: "26/01/2021",
    },
]

const Transaction = {
    all:transactions,
    incomes() {
        let income = 0;

        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount
            }
        })
        
        return income
    },

    expenses(){
        let expense = 0;

        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount
            }
        })
        
        return expense
    },

    total(){
        return incomes() + expenses()
    },
}

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="minus"></td>
        `
        return html
    },

    updateBalance(income, expense, total){
        document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total())
        
    },

}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {style: "currency", currency:"BRL",})
        return signal + value
    }
}

transactions.forEach((transaction)=>{DOM.addTransaction(transaction)})
DOM.updateBalance()