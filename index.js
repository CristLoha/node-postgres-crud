// index.js
const express = require('express');
const app = express();
const PORT = 4000;

// middleware
app.use(express.json());

// routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// route default
app.get('/', (req, res) => {
    res.send('API is running... 🚀');
});

// 📌 Global Error Handling Middleware
// Ini harus diletakkan SETELAH semua route.
// Express akan otomatis menggunakannya jika ada error yang dilempar oleh `next(err)`.
app.use((err, req, res, next) => {
    console.error('ERROR 💥', err);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Something went very wrong!'
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
