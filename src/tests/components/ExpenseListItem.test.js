import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem  from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';
const expense = expenses[0]
test('should render ExpenseList Item', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});
