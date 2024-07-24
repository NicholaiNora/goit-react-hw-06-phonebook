// import React, { Component } from 'react';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'features/contactsSlice';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.contacts.initialContacts);

  const dispatch = useDispatch();

  const toCapitalize = phrase => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactExists = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );
    console.log(toCapitalize(name));
    if (contactExists) {
      alert(`${toCapitalize(name)} or ${number} is already in contacts.`);
      reset();
      return;
    }

    dispatch(addContact({ id: nanoid(), name: name, number: number }));

    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.formLabel}>
        <span>Name</span>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          value={name}
          onChange={handleChange}
          className={css.formInput}
        />
      </label>
      <label className={css.formLabel}>
        <span className={css.formSpan}>Number</span>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
          className={css.formInput}
        />
      </label>

      <button type="submit" className={css.formButton}>
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
