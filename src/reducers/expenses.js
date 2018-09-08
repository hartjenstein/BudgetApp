// Expenses Reducer

const expensesReducerDefaultState = [];
export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': 
        //use concat instead of push to avoid mutating the array
        // here we use array destructuring and the rest operator
          return [...state, action.expense];
        case 'REMOVE_EXPENSE': 
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE': 
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {...expense,
                        ...action.updates
                    };
                } else {
                    return expense
                }
            });
        case 'SET_EXPENSES': 
            return action.expenses;
        default: 
            return state;
    }
};
