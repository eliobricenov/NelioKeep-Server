const { body, param } = require('express-validator/check');

const createImage = [
    body('url', 'No url provided').exists().withMessage('Not valid url provided'),
    body('note_id', 'No note_id provided').exists()
        .isNumeric().withMessage('note_id is not a valid number')
];

const getImage = [
    param('id', 'No id provided').exists()
        .isNumeric().withMessage('id is not a valid number')
];

const editImage = [
    param('id', 'No id provided').exists(),
    body('url', 'No url provided').exists().isURL().withMessage('Not valid url provided')
];

const deleteImage = [
    param('id', 'No id provided').exists()
        .isNumeric().withMessage('id is not a valid number')
];

module.exports = { createImage, getImage, editImage, deleteImage };