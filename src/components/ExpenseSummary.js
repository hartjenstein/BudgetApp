import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';

export class ExpenseSummary extends React.Component {

    expenseTotal() {
        const totalExpense = selectExpensesTotal(this.props.expenses);
        return numeral( totalExpense / 100).format('$0,0.00');
    }
    render() {
        return (
            <div>
                <h3>
                
                   You have {this.props.expenses.length} {this.props.expenses.length === 1 ? 'Expense' : 'Expenses' } with a total of {this.expenseTotal()}
                    
                </h3>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

export default connect(mapStateToProps)(ExpenseSummary);