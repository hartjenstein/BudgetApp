import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

const ExpenseListFilters = (props) => (
    <div>
        <input type="text" value={props.filters.text} onChange={(e) => {
           props.dispatch(setTextFilter(e.target.value)) 
        }} />
        <select 
        value={props.filters.sortBy} // provides controlled input - single point of truth.
        // Otherwise data would be coming from DOM and could differ
        onChange={(e) => {
            e.target.value === 'date' ?  props.dispatch(sortByDate()) : props.dispatch(sortByAmount());
        }}
        >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div> 
);

// passing in the state object gives us access to the whole state 
// we then return whatever we need from it, in this case all the filters

const mapStateToProps = state => {
    return {
        filters: state.filters
    };
};
//connect creates a higher order component that wraps this component 
//with the functionality to connect to the redux store
export default connect(mapStateToProps)(ExpenseListFilters);