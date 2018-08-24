import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

//const date = new Date();
//moment example
const now = moment();
console.log(now.format('MMM Do, YYYY'));

// using local state to keep track of the changes the user makes in the form
// only if user submits we send it of to redux
export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createAt) : moment(),
            calenderFocused: false,
            error: ''
        };
    };

    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description })); 
    };

    onNoteChange = e => {
        const note = e.target.value;
        this.setState(() => ({ note }));    
    };

    onAmountChange = e => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        } 
    };

    onDateChange = (createdAt) => {
        if (createdAt) {
        this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused: focused }));
    };

    onSubmit = e => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please enter a description and a amount'}));
        } else {
            this.setState(() => ({ error: ' ' }));
            this.props.onSubmit({ 
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                // valueOF() -> momentJS method to get the timestamp back
                createAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    };

    render() {
        return (
            <div>
                { this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                        placeholder="Description"
                        autoFocus
                        //ontrolled components for single point of truth
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input type="text" 
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        //required
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calenderFocused}
                        onFocusChange={this.onFocusChange}
                        // custom
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea 
                        placeholder="Add a Note to your expense"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                        >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}