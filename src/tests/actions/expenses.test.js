import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const uid = 'testuid'
const defaultAuthState = {auth: { uid }}
// we can pass in an array with middleware
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {   //using ES6 object destructuring
    expensesData[id] = { description, note, amount, createdAt };     // using ES6 shorthand

  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
  .catch((err) => console.log('ERR:', err));
})

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
	const store = createMockStore({auth: { uid }});
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	};

	store.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions(); // store.getActions gets all the actions that were dispatched to the mock store
			expect(actions[0])
				.toEqual({
					type: 'ADD_EXPENSE',
					expense: {
						id: expect.any(String),
						...expenseData
					}
				});

			return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
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
  const store = createMockStore({auth: { uid }});
    const defaults = {	
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
       const actions = store.getActions();   // store.getActions gets all the actions that were dispatched to the mock store
       expect(actions[0]).toEqual({
           type: 'ADD_EXPENSE',
           expense: {
               id: expect.any(String),
               ...defaults
           }
       });
       return database.ref(`users/${uid}/expenses/${actions[0].expenses.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.vall()).toEqual(expenseData);
        // calling done tells jest that we are done making assertions
        // jest is forced to wait until done() is called
        done();
    })/* .catch((err) => {
      console.log('ERR', err);
    }); */
});

// old test case 
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

test('should setup SET_EXPENSE action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({   // toEqual() when comparing objects or arrays .toBe() otherwise
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch expenses from firebase', (done) => { // we use done for async test cases so the test case is not executed until the data from the promise came back
  const store = createMockStore({auth: { uid }});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();     // we get all the actions back from the mockstore (only one in this case)
    expect(actions[0]).toEqual({     // actions[0] is the last action that was dipsatched to the mock store 
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
})

test('should remove Expense from Firebase', done => {
  const store = createMockStore({auth: { uid }});
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    })
    return database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toBeFalsy(); // expect the expense with this id not exist, thus expect it to be null
      done();
    });
  })

});

test('should edit Expense in Firebase', done => {
  const store = createMockStore({auth: { uid }});
  const id = expenses[0].id;
  const update = {amount: 5000};
  store.dispatch(startEditExpense(id, update)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates: {
        amount: 5000
      }
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
      expect(snapshot.val().amount).toBe(5000);
    done();
    });
  });
});