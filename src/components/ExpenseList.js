import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//exporting the unconnected function for testing with enzyme
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : props.expenses.map((expense) => (
                <ExpenseListItem 
                key={expense.id}
                {...expense}
                />
        ))}
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
