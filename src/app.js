import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses, listenToChange } from './actions/expenses.js';
import getVisibleExpenses from './selectors/expenses.js';
import { login, logout} from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';



const store = configureStore();
/* 
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);

});

store.dispatch(addExpense({ description: 'Water Bill', amount: 100}));
store.dispatch(addExpense({ description: 'Gas Bill', amount: 300, createdAt: 1000}));
store.dispatch(addExpense({ description: 'Phone', amount: 300})); */

const jsx = (
   <Provider store={store}>
    <AppRouter />
   </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// runs on inital page load
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
    renderApp();
    if(history.location.pathname === '/') {
      history.push('/dashboard');
    }
    });
    store.dispatch(listenToChange());
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
