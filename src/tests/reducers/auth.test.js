import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const action = {
      type: 'LOGIN',
      uid: 1234
  };
  const state = authReducer(state, action);
  expect(state).toEqual({ uid: action.uid });
});

test('should clear uid on logout', () => {
  const action = {
      type: 'LOGOUT'
  };
  const state = authReducer({ uid: 'anything' }, action);
  expect(state).toEqual({ });
});