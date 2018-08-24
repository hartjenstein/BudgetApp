import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses.js'
const AddExpensePage = (props) => (
    <div>
      <h1>Add Expense</h1>
      <ExpenseForm 
      onSubmit={(expense) => {
        props.dispatch(addExpense(expense));
        props.history.push('/');
      }}/>
    </div>
  );
  // if you only need the dispatch method you can call connect without argument
  export default connect()(AddExpensePage);