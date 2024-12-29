import { createContext, useContext } from 'react';

export const MyFormContext = createContext(null);

export const useMyFormContext = () => {
  const context = useContext(MyFormContext);
  if (!context) {
    throw new Error(
      'Form components must be used within a MyFormContext.Provider'
    );
  }
  return context;
};
