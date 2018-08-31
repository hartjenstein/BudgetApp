import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';
// Refactor to class based components so we can convert inline functions (meaning in JSX defined) to methods, 
// so that they dont have to be redefined everytime the component gets rendered (for testing purposes )

// there are special props that are passed down by react router like the history object
export class EditExpensePage extends React.Component {
  handleOnSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  handleOnClick= () => {
    this.props.removeExpense({id: this.props.expense.id})
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ExpenseForm 
            expense={this.props.expense}
            onSubmit={this.handleOnSubmit}
        />
        <button 
          onClick={this.handleOnClick}
        >Remove</button>
      </div>
    );
  }
};

// we are searching the state object in the store for the id we get from the props that are passed down by the router 
// we can pass state and props as arguments to the higher order component (hoc) in order to do that
const mapStateToProps = (state, props) => {
  return {
    // we generate a new prop called expense and add it on to props
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch, props) => (
  { editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense(data))
  });

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);