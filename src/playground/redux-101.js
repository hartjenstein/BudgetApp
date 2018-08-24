import { createStore } from 'redux';


// when returing object implicitly with arrow functions 
//dont forget the round braces!
// (payload = {}) - payload defaults to empty object

// object destructuring in arguments
//
//
const add = ({a, b}, c) => {
  return a + b + c;
}
console.log(add({a: 5, b: 4}, 100));
//
//


/// Action Generators - functions that return action objects ///
// object destructuring in arguments - defaulting to
// empty object and property incrementBy defaulting to 1
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  //shorthand for inrementBy : incrementBy
  incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const resetCount = () => ({
  type: 'RESET'
})

const setCount = ({ count } = {}) => ({
  type: 'SET',
  count
})

// Reducers
// 1. Reducers are pure functions 
// - means Output is determined soley by the input. No side effects
// 2. Never change state or action directly
const countReducer = (state = { count: 0 }, action) => {
	console.log('running');
	switch (action.type) {
    case 'INCREMENT':
			return { count: state.count + action.incrementBy };
    case 'DECREMENT':
			return { count: state.count - action.decrementBy };
		case 'RESET':
      return { count: 0 };
    case 'SET':
     return { count: action.count }
		default:
			return state;
	};

}

const store = createStore(countReducer);

// Actions
// I'd like to increment the count
const unsubscribe = store.subscribe(()=>{
  console.log(store.getState());
});

// down below are inline action objects - use action 
//generators instead to get errors and autocompletion
/* store.dispatch({
  type: 'INCREMENT',
  incrementBy: 5
}); */
store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 13 }));

store.dispatch(resetCount());

store.dispatch(setCount({ count: 13 }));

/* store.dispatch({
  type: 'DECREMENT',
  decrementBy: 7
}); */

/* store.dispatch({
	type: 'RESET'
}); */

// I'd like to reset the count to zero
/* 
store.dispatch({
  type: 'SET',
  count: 101
}); */

unsubscribe();


