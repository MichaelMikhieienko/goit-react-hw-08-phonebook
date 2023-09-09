// index.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {contactAPI} from '../../api/contactAPI';

const initialState = {
  contacts: {
    items: [
      {name: 'Misha', number: '12312312'}
    ],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (params, {getState}) => {
    const state = getState();
    if (!state?.phonebook?.contacts.isLoading) {
      return;
    }

    const response = await contactAPI().fetchContacts();
    return response.json();
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact) => {
    const response = await contactAPI().addContact(newContact);
    if (response.status >= 400) {
      return Promise.reject(response.json());
    }
    return response.json();
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await contactAPI().deleteContact(contactId);
    return contactId;
  },
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilterContact: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        if (state?.contacts.isLoading) {
          state.contacts.items.push(...action.payload);
          state.contacts.isLoading = false;
        }
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        if (state?.contacts.isLoading) {
          state.contacts.isLoading = false;
          state.contacts.error = action?.error;
        }
      });

    builder.addCase(addContact.fulfilled, (state, action) => {
      state?.contacts.items.push(action.payload);
    })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts.items = state?.contacts.items.filter(
        item => item.id !== action.payload,
      );
    });
  },
});

export const {setFilterContact} = contactsSlice.actions;

export default contactsSlice.reducer;
