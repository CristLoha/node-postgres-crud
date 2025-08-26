// controllers/userController.js
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

// 📌 Ambil semua user
exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await User.getAll();

    // Bungkus respons dalam format standar
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users: users,
        },
    });
});

// 📌 Tambah user
exports.createUser = catchAsync(async (req, res, next) => {
    const { name, email, age } = req.body;
    const newUser = await User.create(name, email, age);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
    });
});

// 📌 Update user
exports.updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedUser = await User.update(id, req.body);

    if (!updatedUser) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

// 📌 Hapus user
exports.deleteUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await User.delete(id);

    if (!result) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    // Untuk DELETE yang sukses, respons 204 No Content adalah standar RESTful.
    // Ini berarti tidak ada body yang dikirim kembali.
    res.status(204).send();
});
