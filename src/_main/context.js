import React, { createContext, useContext, useReducer } from 'react';
import rootReducer from './rootReducer';
import initialState from './initialState';

const Context = createContext();

export const useGlobalContext = () => {
  return useContext(Context);
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
