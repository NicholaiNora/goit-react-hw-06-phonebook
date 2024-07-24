// import React, { Component } from 'react';
import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import SearchFilter from './SearchFilter/SearchFilter';
import ContactList from './ContactList/ContactList';

function App() {
  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      <SearchFilter />
      <ContactList />
    </div>
  );
}

export default App;
