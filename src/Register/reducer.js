import { REGISTER_USER, UPDATE_USER, DELETE_USER } from '../_main/actionTypes';

const initialState = {
  users: JSON.parse(sessionStorage.getItem('users')) || [],
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      const newUsers = [...state.users, { ...action.payload, id: state.users.length + 1 }];
      sessionStorage.setItem('users', JSON.stringify(newUsers));
      return { ...state, users: newUsers };

    case UPDATE_USER:
      const updatedUsers = state.users.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload.updatedUser } : user
      );
      sessionStorage.setItem('users', JSON.stringify(updatedUsers));
      return { ...state, users: updatedUsers };

    case DELETE_USER:
      const filteredUsers = state.users.filter((user) => user.id !== action.payload);
      sessionStorage.setItem('users', JSON.stringify(filteredUsers));
      return { ...state, users: filteredUsers };

    default:
      return state;
  }
}
