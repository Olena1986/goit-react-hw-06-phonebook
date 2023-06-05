import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteContact } from 'Redux/contactsSlice.js';
import { ContactListStyle } from './ContactList.styled';
import ContactListItem from '../List/ContactListItem';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <ContactListStyle.ListStyle>
      {contacts.map((contact) => (
        <ContactListItem key={contact.id} contact={contact} onDelete={handleDelete} />
      ))}
    </ContactListStyle.ListStyle>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;

