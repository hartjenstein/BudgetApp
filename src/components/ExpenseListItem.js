import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
 
const ExpenseListItem = ({ id, description, amount, createdAt, note  } ) => (
    <div className="ExpenseListItem">
        {description &&  <Link to={`/edit/${id}`}><h3>{description}</h3></Link>}
        {note &&  <p>Note: {note}</p>}
        {amount &&  <p>Amount: {amount}</p>}
        {createdAt &&  <p>Time created: {moment(createdAt).format('MM Do, YYYY')}</p>}
    </div>
)

export default ExpenseListItem;