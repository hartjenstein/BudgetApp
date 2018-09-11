import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {
    state = {
        calenderFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calenderFocused) => {  
        this.setState(() => ({ calenderFocused }));
    }

    onTextFilterChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    onSortByChange = (e) => {
        e.target.value === 'date' ?  this.props.sortByDate() : this.props.sortByAmount();
    }

    render() { 
        return (
            <div className="content-container">
              <div className="input-group">
                <div className="input-group__item">
                  <input className="input--text" placeholder="Search Expenses" type="text" value={this.props.filters.text} onChange={this.onTextFilterChange} />
                </div>
                <div className="input-group__item">
                  <select className="input--select"
                  value={this.props.filters.sortBy} // provides controlled input - single point of truth.
                  // Otherwise data would be coming from DOM and could differ
                  onChange={this.onSortByChange}
                  >
                      <option value="date">Date</option>
                      <option value="amount">Amount</option>
                  </select>
                </div>
                <div className="input-group__item">
                    <DateRangePicker 
                    // props required by DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calenderFocused}
                    onFocusChange={this.onFocusChange}
                    // customizitations
                    showClearDates={true}
                    numberOfMonths={1}
                    // enable range beyond current date
                    isOutsideRange={() => false}
                    />
                 </div>
              </div>   
            </div> 
        );
    }
};


// passing in the state object gives us access to the whole state 
// we then return whatever we need from it, in this case all the filters
// we add filters to props
const mapStateToProps = state => {
    return {
        filters: state.filters
    };
};

const mapDispatchToProps = dispatch => ({
    setTextFilter: text => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});
//connect creates a higher order component that wraps this component 
//with the functionality to connect to the redux store

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);