import uuid from 'uuid';
import database from '../firebase/firebase';

// Action generators for expenses reducer //

///* flow without firebase:
// component calls actoin generator
// action generator returns object
// component dispatches object
// redux store changes

///*flow with firebase
// component calls action generator
// action generator returns function
// component dispatches function (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)
//redux by default does not allow to dispatch functions. Thats what we use thunk for

//ADD_EXPENSE
//action generator without firebase
/* export const addExpense = ({ 
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0 
} = {}) =>  ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
}
}); */
// the ADD_EXPENSE action generator (above) is simplefied and we add the  async action gen. startAddExpense, as firebase database only takes objects and 
// the redux store state only accepts arrays.
export const addExpense = (expense) => ({
	type: 'ADD_EXPENSE',
	expense
});

export const startAddExpense = (expenseData = {}) => {
  // passing dispatch as an arguement, this is happening internally with thunk middleware and redux! 
	return (dispatch) => {
		const {
			//moving defaults here from ADD_EXPENSE, destructuring inside function instead of in the arguements to make it readable more easily
			description = '',
				note = '',
				amount = 0,
				createdAt = 0
		} = expenseData;
		const expense = { description, note, amount, createdAt };
		// saving data to firebase, then dispatching the action
		// asyncronus action generator - promise comes back from firebase 
		//and gets called with ref as an arguement - we get the ref object returned from our call to the database
		// ref.key contains the id firebase created for data set we've just pushed
		// 
		return database.ref('expenses')
			.push(expense)
			.then((ref) => {
				dispatch(addExpense({
					id: ref.key,
					...expense
				}));
		});
	};
};

// REMOVE_EXPENSE 
export const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

// EDIT_EXPENSE 
export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update({
      ...updates
    }).then(() => {
      dispatch(editExpense(id, updates))
    });
  };
}; 

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

//Async function to handle firebase set data
export const startSetExpenses = () => {
  // dispatch arguement is provided internally from thunk middleware 
 return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
  }
};

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => { // dispatch arguement gets passed in by redux library / redux thunk middleware
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};