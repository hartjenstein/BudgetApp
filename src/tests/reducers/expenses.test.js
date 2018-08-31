import expensesReducer from '../../reducers/expenses';
//import test data for assertion
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1  
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should edit an expense', () => {
    const updates = { note: 'test' };
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].note).toEqual(updates.note);
});

test('should not edit an expense if expense not found', () => {
    const updates = { note: 'test' };
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates 
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '4',
            description: 'Rum',
            note: '',
            amount: 19,
            createdAt: 0
        }
    };
    const updatedExpenses = [...expenses, action.expense];
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(updatedExpenses);
});