import { configureStore } from '@reduxjs/toolkit';
import phonebook from './reducers';

const store = configureStore({
  reducer: {
    phonebook: phonebook,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware(),
});

export default store;
