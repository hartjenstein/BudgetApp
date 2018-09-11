import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <div className="page-header">
              <div className="content-container">
                <h2 className="page-header__title">
                   You have <span>{this.props.expenses.length} {this.props.expenses.length === 1 ? 'expense' : 'expenses' } </span> with a total of <span>{this.expenseTotal() }</span>
                </h2>
                <div className="page-header__actions">
                  <Link className="button" to="/create">Add Expense</Link>
                </div>
              </div>
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