import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import expenses from '../fixtures/expenses';
import { filters, altFilters} from '../fixtures/filters';
import moment from 'moment'


let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
});

test('should render component ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render component ExpenseListFilters with altFilters Data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'Bill';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.find('select').at(0).simulate('change', {
        target: { value }
    })

    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').at(0).simulate('change', {
        target: { value }
    })

    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(3, 'years');
    const endDate = moment(0).add(8, 'years');

    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});

    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should handle focus changes', () => {
    const focused = 'startDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(focused);
    expect(wrapper.state('calenderFocused')).toBe(focused)
});
