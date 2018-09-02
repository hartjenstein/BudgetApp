import React from 'react';
import Numeral from 'numeral';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';


test('should render correctly with 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary expenses={[expenses[1]]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly with multiple expenses', () => {
  const wrapper = shallow(<ExpenseSummary expenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});