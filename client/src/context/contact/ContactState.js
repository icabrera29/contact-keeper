import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_ERRORS
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      console.log(error.response.data.errors);
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.errors.map(err => err.msg)
      });
    }
  };
  // Delete contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      });
    }
  };
  // update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.errors.map(err => err.msg)
      });
    }
  };
  // set current contact
  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear Contacts
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    });
  };
  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };
  // clear current contact
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
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
        error: state.error,
        addContact,
        updateContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
        clearErrors
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
