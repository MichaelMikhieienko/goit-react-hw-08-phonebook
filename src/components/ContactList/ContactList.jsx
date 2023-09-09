// ContactList.jsx
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';

const ContactList = ({ contacts }) => {
  return (
    <div>
      {contacts.map(contact => (
        <Fragment key={contact.id}>
          <ContactItem contact={contact} />
        </Fragment>
      ))}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      Phone: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;
