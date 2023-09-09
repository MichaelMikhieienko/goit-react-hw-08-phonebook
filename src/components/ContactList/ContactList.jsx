// ContactList.jsx
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import {List} from '@mui/joy';

const ContactList = ({contacts}) => {
  return (
    <List>
      {contacts.map(contact => (
        <Fragment key={contact.id}>
          <ContactItem contact={contact} />
        </Fragment>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ContactList;
