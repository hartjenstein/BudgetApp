import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

const zeroExpenses = [];

test('should return 0 if no expenses', () => {
    const total = selectExpensesTotal(zeroExpenses);
    expect(total).toBe(0);
});

test('should correctly add up single expense', () => {
    const total = selectExpensesTotal([expenses[1]]);
    expect(total).toBe(expenses[1].amount);
});

test('should correctly add up multiple expenses', () => {
    const total = selectExpensesTotal(expenses);
    expect(total).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});