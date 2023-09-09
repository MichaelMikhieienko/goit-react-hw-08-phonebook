// store.js
import {configureStore} from '@reduxjs/toolkit';
import {phonebook, user} from './index';

const store = configureStore({
  reducer: {
    phonebook,
    user,
  },
});

export default store;
