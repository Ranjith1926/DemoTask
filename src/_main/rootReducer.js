import loginReducer from '../Login/reducer';
import registerReducer from '../Register/reducer';
import todoReducerReducer from '../DashBoard/reducer';

const combineReducers = (reducers) => (state, action) =>
  Object.keys(reducers).reduce(
    (acc, key) => ({
      ...acc,
      [key]: reducers[key](acc[key], action),
    }),
    state
  );

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  todo: todoReducerReducer,
});
