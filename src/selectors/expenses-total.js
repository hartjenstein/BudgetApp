
export default (expenses) => {
    return expenses.map(expense => expense.amount).reduce((a, b) => a + b, 0);  
};