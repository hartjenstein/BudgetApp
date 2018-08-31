import { addExpense, editExpense, removeExpense} from '../../actions/expenses';

// removeExpense

test('should setup removeExpense action object', () => {
    const action = removeExpense({ id: '1234' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '1234'
    });
});

test('should setup editExpense object ', () => {
    const action = editExpense('123', {description: 'Test', note: 'Test'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {description: 'Test', note: 'Test'}
    })
}); 

test('should setup addExpense actoin object with provided values', () => {
    const expenseData = {
        description: 'rent',
        amount: 1003,
        createdAt: 1000,
        note: 'note'
    }
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            // since id is generated dynamically we just expect any string with the type of string
            id: expect.any(String)
        }
    })
});

test('should addExpense actoin object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    })
});