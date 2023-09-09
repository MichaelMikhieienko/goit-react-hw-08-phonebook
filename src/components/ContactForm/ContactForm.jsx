// ContactForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/reducers';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { contacts } = useSelector(state => state.phonebook);

  const handleAddContact = contact => {
    if (!checkNewContactPresence(contact.name)) {
      dispatch(addContact(contact));
    } else {
      alert(`${contact.name} is already in contacts!`);
    }
  };

  const checkNewContactPresence = contactName => {
    return contacts.items.some(contact => contact.name === contactName);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || number.trim() === '') return;

    const contact = {
      id: nanoid(),
      name: name.trim(),
      Phone: number.trim(),
    };

    handleAddContact(contact);
    setName('');
    setNumber('');
  };

  return (
    <div>
      <h2>Name</h2>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+([ -][a-zA-Zа-яА-Я]+)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <h2>Number</h2>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={e => setNumber(e.target.value)}
      />

      <button type="submit" onClick={handleSubmit}>
        Add Contact
      </button>
    </div>
  );
};

export default ContactForm;
