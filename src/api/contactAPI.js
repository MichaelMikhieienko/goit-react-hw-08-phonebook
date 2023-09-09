const baseURL = 'https://64e31f92bac46e480e7835f9.mockapi.io';

export const contactAPI = {
  fetchContacts: async params => {
    return fetch(`${baseURL}/Contacts`);
  },
  addContact: async newContact => {
    return fetch(`${baseURL}/Contacts`, {
      method: 'POST',
      body: JSON.stringify(newContact),
    });
  },
  deleteContact: async contactId => {
    return fetch(`${baseURL}/Contacts/${contactId}`, { method: 'DELETE' });
  },
};
