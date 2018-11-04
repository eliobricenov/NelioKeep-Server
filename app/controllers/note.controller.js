const express = require('express');
const router = express.Router();

const noteService = require('../services/note.service');
const noteValidations = require('../utils/validation/note/noteValidation.middleware');
const handleValidationErrors = require('../utils/validation/validationHandler.middleware');
const jwtUtils = require('../utils/jwt');
const config = require('../configuration');

router
    //start of endpoints

    .get('/', [jwtUtils.verifyToken], async (req, res, next) => {
        try {
            const session = await jwtUtils.decodeToken(req.token, config.secretKey);
            const data = await noteService.get(session.data.id);
            res.status(200).send({
                status: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    })
    
    .get('/:id', [jwtUtils.verifyToken, noteValidations.getNote, handleValidationErrors],  async (req, res, next) => {
        try {
            const session = await jwtUtils.decodeToken(req.token, config.secretKey);
            const data = await noteService.getOne(req.params.id, session.data.id);
            res.status(200).send({
                status: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    })

    .post('/', [jwtUtils.verifyToken, noteValidations.createNote, handleValidationErrors], async (req, res, next) => {
        try {
            const session = await jwtUtils.decodeToken(req.token, config.secretKey);
            const response = await noteService.create(req.body, session.data.id);
            res.status(200).send({
                status: 200,
                data: response
            });
        } catch (error) {
            next(error);
        }
    })
    
    .put('/:id', [jwtUtils.verifyToken, noteValidations.editNote, handleValidationErrors], async (req, res, next) => {
        try {
            const session = await jwtUtils.decodeToken(req.token, config.secretKey);
            const data = await noteService.edit(req.params.id, req.body, session.data.id);
            res.status(200).send({
                status: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    })

    .delete('/:id', [jwtUtils.verifyToken, noteValidations.deleteNote, handleValidationErrors], async (req, res, next) => {
        try {
            const session = await jwtUtils.decodeToken(req.token, config.secretKey);
            const success = await noteService.delete(req.params.id, session.data.id);
            res.status(200).send({
                status: 200,
                data: []
            });
        } catch (error) {
            next(error);
        }
    });


module.exports = router;