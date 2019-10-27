import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill johnson',
        email: 'jill@gmail.com',
        phone: '111-6666-58',
        type: 'personal'
      },
      {
        id: 2,
        name: 'John doe',
        email: 'johndoe@gmail.com',
        phone: '111-2965-58',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Mark Cuban',
        email: 'mark.cuban@gmail.com',
        phone: '111-454-58',
        type: 'professional'
      },
      {
        id: 4,
        name: 'Mark zuckerberg',
        email: 'zuckerberg@gmail.com',
        phone: '111-2965-58',
        type: 'personal'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  // set current contact
  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // clear current contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  // Filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
