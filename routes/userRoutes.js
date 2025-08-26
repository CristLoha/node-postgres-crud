// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userController');

// Middleware kecil untuk menangani hasil validasi
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    // Jika ada error, kirim respons 400 dengan detail errornya
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({
        status: 'fail',
        errors: extractedErrors,
    });
};

// CRUD endpoints
router.get('/', userController.getUsers);

router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Must be a valid email address'),
    body('age').notEmpty().withMessage('Age is required').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
], validate, userController.createUser);

router.put('/:id', [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email address'),
    body('age').optional().notEmpty().withMessage('Age cannot be empty').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
], validate, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
