// ContactItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {deleteContact} from '../../redux';
import {Button, ListItem} from '@mui/joy';

const ContactItem = ({contact}) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <ListItem
      endAction={(
        <Button variant="soft" color="danger" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      )}
    >
      {contact.name} - {contact.number}

    </ListItem>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactItem;
