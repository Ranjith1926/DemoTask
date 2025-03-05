import { FETCH_TODOS, UPDATE_TODO, DELETE_TODO } from '../_main/actionTypes';

const initialState = {
  list: [],
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, list: action.payload };

    // case UPDATE_TODO:
    //   return {
    //     ...state,
    //     list: state.list.map((todo) =>
    //       todo.id === action.payload.id ? action.payload : todo
    //     ),
    //   };

    // case DELETE_TODO:
    //   return {
    //     ...state,
    //     list: state.list.filter((todo) => todo.id !== action.payload.id),
    //   };


    case UPDATE_TODO:
      return {
        ...state,
        list: state.list.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.updatedData } : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}
