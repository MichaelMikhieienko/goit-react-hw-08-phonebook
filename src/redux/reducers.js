import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactAPI } from '../api/contactAPI';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (params, { getState }) => {
    const state = getState();
    if (!state.phonebook.contacts.isLoading) {
      return;
    }

    const response = await contactAPI.fetchContacts();
    return response.json();
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { getState }) => {
    const response = await contactAPI.addContact(newContact);
    return response.json();
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await contactAPI.deleteContact(contactId);
    return contactId;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilterContact: (state, action) => {
      console.log(action);
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        if (state.contacts.isLoading) {
          state.contacts.items.push(...action.payload);
          state.contacts.isLoading = false;
        }
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        if (state.contacts.isLoading) {
          state.contacts.isLoading = false;
          state.contacts.error = action.error;
        }
      });

    builder.addCase(addContact.fulfilled, (state, action) => {
      state.contacts.items.push(action.payload);
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts.items = state.contacts.items.filter(
        item => item.id !== action.payload
      );
    });
  },
});

export const { setFilterContact } = contactsSlice.actions;

export default contactsSlice.reducer;
