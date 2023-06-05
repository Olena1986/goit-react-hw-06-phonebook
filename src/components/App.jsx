import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { AppStyle } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { addContact, deleteContact, updateFilter } from 'Redux/contactsSlice.js';

const App = () => {
  const dispatch = useDispatch();
 const contacts = useSelector(state => state.contacts.contacts);
const filter = useSelector(state => state.contacts.filter);


  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      dispatch(addContact(JSON.parse(savedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

 const filteredContacts = contacts.filter((contact) =>
  contact.name.toLowerCase().includes(filter.toLowerCase())
);
console.log(contacts);
  return (
    <AppStyle.AppContainer>
      <AppStyle.AppTitle>Phonebook</AppStyle.AppTitle>
      <ContactForm addContact={handleAddContact} />

      <AppStyle.AppSubtitle>Contacts</AppStyle.AppSubtitle>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </AppStyle.AppContainer>
  );
};

export default App;
