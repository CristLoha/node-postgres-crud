// Ini adalah fungsi tingkat tinggi (higher-order function) yang menerima fungsi async (controller)
// dan mengembalikan fungsi baru. Fungsi baru ini akan menjalankan controller asli
// dan menangkap setiap error yang terjadi, lalu meneruskannya ke middleware error Express.
module.exports = fn => (req, res, next) => {
    fn(req, res, next).catch(next);
};
