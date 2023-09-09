import phonebook, { addContact, deleteContact, fetchContacts, setFilterContact } from './reducers/phonebook';
import user, { getCurrentUser, login, logout, signup } from './reducers/user';

export {
  addContact,
  deleteContact,
  fetchContacts,
  setFilterContact,
  getCurrentUser,
  login,
  logout,
  signup,
  phonebook,
  user,
};
