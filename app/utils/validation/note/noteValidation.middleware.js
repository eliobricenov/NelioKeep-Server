const { body, param } = require('express-validator/check');

const createNote = [
    body('title', 'No title provided').exists(),
    body('content', 'No content provided').exists()
];

const getNote = [
    param('id', 'No id provided').exists()
        .isNumeric().withMessage('id is not a valid number')
];

const editNote = [
    body('id', 'No id provided').exists()
        .isNumeric().withMessage('id not a valid number'),
    body('title', 'No title provided').exists(),
    body('content', 'No content provided').exists()
];

const deleteNote = [
    param('id', 'No id provided').exists()
        .isNumeric().withMessage('id is not a valid number')
];

module.exports = { createNote, getNote, editNote, deleteNote };