// App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterContact } from '../redux/reducers';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { fetchContacts } from '../redux/reducers';

const App = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(state => state.phonebook);

  useEffect(() => {
    (() => {
      dispatch(fetchContacts());
    })();
  }, [dispatch]);

  const handleFilterChange = e => {
    dispatch(setFilterContact(e.target.value));
  };

  const filteredContacts = contacts.items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default App;
