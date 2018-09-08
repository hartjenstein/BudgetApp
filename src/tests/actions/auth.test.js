import { login, logout } from '../../actions/auth';

// login
test('should generate login action object', () => {
  const uid = 1234;
	const action = login(uid);
	expect(action)
		.toEqual({
			type: 'LOGIN',
      uid
  });
});

test('should generate logout action object', () => {
  const uid = 1234;
	const action = logout();
	expect(action)
		.toEqual({
			type: 'LOGOUT'
  });
});