import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TableStore from './store/TableStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    tables: new TableStore()
  }}>
      <App />
  </Context.Provider>
)