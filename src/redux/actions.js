// actions.js
import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const addContact = createAction('phonebook/addContact', contactData => {
  return {
    payload: {
      id: nanoid(),
      ...contactData,
    },
  };
});

export const deleteContact = createAction('phonebook/deleteContact');
export const setFilterContact = createAction('phonebook/setFilterContact');
