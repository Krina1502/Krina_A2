import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (tx) => {
    // Add a unique ID to each transaction for identification
    const newTx = { ...tx, id: Date.now().toString() };
    setTransactions(prev => [...prev, newTx]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  return (
    <AppContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
