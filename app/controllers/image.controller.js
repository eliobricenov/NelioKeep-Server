const express = require('express');
const router = express.Router();

const imageService = require('../services/image.service');
const imageValidations = require('../utils/validation/image/imageValidation.middleware');
const handleValidationErrors = require('../utils/validation/validationHandler.middleware');
const jwtUtils = require('../utils/jwt');

router
    //start of endpoints

    .get('/:id', [jwtUtils.verifyToken, imageValidations.getImage,
        handleValidationErrors], async (req, res, next) => {
            try {
                const data = await imageService.getOne(req.params.id);
                res.status(200).send({
                    status: 200,
                    data
                });
            } catch (error) {
                next(error);
            }
        })

    .post('/', [jwtUtils.verifyToken, imageValidations.createImage, 
        handleValidationErrors], async (req, res, next) => {
        try {
            const data = await imageService.create(req.body);
            res.status(200).send({
                status: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    })

    .put('/', [jwtUtils.verifyToken, imageValidations.editImage, 
        handleValidationErrors], async (req, res, next) => {
        try {
            const data = await imageService.edit(req.body);
            res.status(200).send({
                status: 200,
                data
            });
        } catch (error) {
            next(error);
        }
    })

    .delete('/:id', [jwtUtils.verifyToken, imageValidations.deleteImage, 
        handleValidationErrors], async (req, res, next) => {
        try {
            const success = await imageService.delete(req.params.id);
            res.status(200).send({
                status: 200,
                data: []
            });
        } catch (error) {
            next(error);
        }
    });


module.exports = router;