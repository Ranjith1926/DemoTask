const initialState = {
  login: { data: JSON.parse(sessionStorage.getItem('user')) || {} },
  register: { users: JSON.parse(sessionStorage.getItem('users')) || [] },
};

export default initialState;
