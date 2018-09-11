import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//exporting the unconnected function for testing with enzyme
export const ExpenseList = (props) => (
    <div className="content-container">
      <div className="list__header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
      </div>
        <div className="list__body">
          {
              props.expenses.length === 0 ? (
                <div className="list__item list__item--message">
                  <span>No expenses</span>
                </div>
      
              ) : props.expenses.map((expense) => (
                  <ExpenseListItem 
                  key={expense.id}
                  {...expense}
                  />
          ))}
        </div>
    </div>
);

//Connecting the component to the redux store with a higher order component (hoc)
// Connect returns another function which 
// creates a higher order component in order to connect to the store
// the stores state gets passed in and we return the props we need out of the state

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

export default connect(mapStateToProps)(ExpenseList);
