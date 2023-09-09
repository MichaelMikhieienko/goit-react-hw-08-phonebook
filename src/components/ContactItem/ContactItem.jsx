// ContactItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/reducers';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div>
      {contact.name} - {contact.Phone}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    Phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
