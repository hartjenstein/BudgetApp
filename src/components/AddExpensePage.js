import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses.js'

// adding export addoitionally to class to make it testable without connect();
export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm 
          onSubmit={this.onSubmit}
          />
        </div>
      
    </div>
    );
  }
}
/// replaced by a class with onSubmit() and mapDispatchToProps() to make it testable 
// - the problem is that the call to dispatch (down below) is referencing 
/* const AddExpensePage = (props) => (
    <div>
      <h1>Add Expense</h1>
      <ExpenseForm 
      onSubmit={(expense) => { */
        // abstracted away (down below) for testing purposes and replaced with a call to onSubmit()
        // props.dispatch(addExpense(expense));
      /*  props.history.push('/');
      }}/>
    </div>
  ); */
///
    //mapDispatchToProps in order to make this component testable with jest
  // we set up the function that connect() takes as a second arguement
  // with mapDispatchProps we pass the call to dispatch and make it testable this way
  //( mapDispatchProps -> a way to return dispatcher functions, abstracting them away from the component itself)
  const mapDispatchToProps = (dispatch) => ({ 
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
  });
    
  
 
  // arguement 
  // if you only need the dispatch method you can call connect without argument
  export default connect(undefined, mapDispatchToProps)(AddExpensePage);