const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @description    get all user contacts
// @access  Private

router.get('/', (req, res) => {
  res.send('Get all Contacts');
});

// @route   POST api/contacts
// @description    Add new contact
// @access  Private

router.post('/', (req, res) => {
  res.send('Create a contact');
});

// @route   PUT api/contacts/:id
// @description    Update
// @access  Private

router.put('/:id', (req, res) => {
  res.send('Update Contact');
});

// @route   DELETE api/contacts/:id
// @description    Update
// @access  Private

router.delete('/:id', (req, res) => {
  res.send('Delete Contact');
});

module.exports = router;
