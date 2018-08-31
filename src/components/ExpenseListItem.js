import React from 'react';
import { Link } from 'react-router-dom';
 
const ExpenseListItem = ({ id, description, amount, createdAt, note  } ) => (
    <div className="ExpenseListItem">
        {description &&  <Link to={`/edit/${id}`}><h3>{description}</h3></Link>}
        {note &&  <p>Note: {note}</p>}
        {amount &&  <p>Amount: {amount}</p>}
        {createdAt &&  <p>Time created: {createdAt}</p>}
    </div>
)

export default ExpenseListItem;