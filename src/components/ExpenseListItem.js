import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses.js';
import { Link } from 'react-router-dom';
 
const ExpenseListItem = ({ dispatch, id, description, amount, createdAt, note  } ) => (
    <div className="ExpenseListItem">
        {description &&  <Link to={`/edit/${id}`}><h3>{description}</h3></Link>}
        {note &&  <p>Note: {note}</p>}
        {amount &&  <p>Amount: {amount}</p>}
        {createdAt &&  <p>Time created: {createdAt}</p>}
        <button onClick= {() => {
            dispatch(removeExpense({ id }))
        }}>Remove</button>
    </div>
)

export default connect()(ExpenseListItem);