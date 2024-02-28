import React from 'react';
import { Provider } from 'react-redux';
import Mental from './mental';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user-reducer';
const store = configureStore(
  {
      reducer:
      {
          user: userReducer,
      }
  });
const App = () => {
  return (
    <Provider store={store}>
      <Mental></Mental>
    </Provider>
  );
};

export default App;
