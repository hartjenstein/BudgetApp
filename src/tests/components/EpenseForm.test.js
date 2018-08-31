import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});
 
test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for incorrect submission (no data passed in)', () => {
    const wrapper = shallow(<ExpenseForm />);
    // the missing event object is causing an error so we simulate e.preventDefault with an object,
    // we pass, that contains preventDefault with an empty function as value
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    }); 

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => { 
    const value = 'New Description';
    const wrapper = shallow(<ExpenseForm />);
    //.at(0) selects first input
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on input change', () => { 
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm />);
    //.at(0) selects first input
    wrapper.find('textarea').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => { 
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => { 
    const value = '12.132';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => { 
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    //if we call it just with expenses[0]. we get the ID passed in and 
   //the function output is not considered a mathc because its without id
   //thats why we define the object down below 
   expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount, 
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })
});

test('should set new date on date change', () => { 
    const now = moment()
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now)
});

test('should set calender focus on change', () => { 
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calenderFocused')).toBe(focused)
});