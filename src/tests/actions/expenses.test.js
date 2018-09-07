import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

// we can pass in an array with middleware
const createMockStore = configureMockStore([thunk]);

// removeExpense

test('should setup removeExpense action object', () => {
	const action = removeExpense({ id: '1234' });
	expect(action)
		.toEqual({
			type: 'REMOVE_EXPENSE',
			id: '1234'
		});
});

test('should setup editExpense object ', () => {
	const action = editExpense('123', { description: 'Test', note: 'Test' });
	expect(action)
		.toEqual({
			type: 'EDIT_EXPENSE',
			id: '123',
			updates: { description: 'Test', note: 'Test' }
		})
});

test('should setup addExpense action object with provided values', () => {
	/*    const expenseData = {
	       description: 'rent',
	       amount: 1003,
	       createdAt: 1000,
	       note: 'note'
	   } */
	const action = addExpense(expenses[2]);
	expect(action)
		.toEqual({
			type: 'ADD_EXPENSE',
			expense: expenses[2]
		})
});

// in this test we care about that the database is getting called and that the right action is dispatched
// using mock store for this
// using promise chaining to test the async action
// with passing the arg done we tell jest that this call is async
// without done the test suite would run before the async calls are completed and have returned the data
test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	};

	store.dispatch(startAddExpense(expenseData))
		.then(() => {
			// store.getActions gets all the actions that were dispatched to the mock store
			const actions = store.getActions();
			expect(actions[0])
				.toEqual({
					type: 'ADD_EXPENSE',
					expense: {
						id: expect.any(String),
						...expenseData
					}
				});

			return database.ref(`expenses/${actions[0].expense.id}`)
				.once('value');
		})
		.then((snapshot) => {
			expect(snapshot.val())
				.toEqual(expenseData);
			// calling done tells jest that we are done making assertions
			// jest is forced to wait until done() is called
			done();
		}).catch((err) => {
      console.log('ERR', err);
    });
});

test('should add expense with defaults to database and store', () => {
    const store = createMockStore({});
    const defaults = {	
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        // store.getActions gets all the actions that were dispatched to the mock store
       const actions = store.getActions();

       expect(actions[0]).toEqual({
           type: 'ADD_EXPENSE',
           expense: {
               id: expect.any(String),
               ...defaults
           }
       });
       return database.ref(`expenses/${actions[0].expenses.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.vall()).toEqual(expenseData);
        // calling done tells jest that we are done making assertions
        // jest is forced to wait until done() is called
        done();
    }).catch((err) => {
      console.log('ERR', err);
    });
});

/* test('should setup addExpense action object with default values', () => {
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
}); */
