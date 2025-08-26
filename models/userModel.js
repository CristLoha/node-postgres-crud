// models/userModel.js
const pool = require('../config/db');

const User = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        return result.rows;
    },

    create: async (name, email, age) => {
        const result = await pool.query(
            'INSERT INTO users (name, email,age) VALUES ($1, $2, $3) RETURNING *',
            [name, email, age]
        );
        return result.rows[0];
    },

    update: async (id, userData) => {
        // Guard clause untuk mencegah error jika userData adalah null atau undefined
        if (!userData) {
            // Jika tidak ada data yang dikirim, kembalikan data user saat ini tanpa perubahan
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return result.rows[0];
        }

        // Kita ubah filter untuk mengabaikan 'null' dan 'undefined'
        // Pengecekan '!= null' secara singkat akan mencakup keduanya.
        const fields = Object.keys(userData)
            .filter(key => userData[key] != null && ['name', 'email', 'age'].includes(key));

        if (fields.length === 0) {
            // Jika tidak ada field yang diupdate, kembalikan data user saat ini
            const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return result.rows[0];
        }

        const setClauses = fields.map((key, index) => `${key}=$${index + 1}`).join(', ');
        const values = fields.map(key => userData[key]);
        values.push(id);

        const query = `UPDATE users SET ${setClauses} WHERE id=$${fields.length + 1} RETURNING *`;
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    delete: async (id) => { // Perbaikan kecil: pastikan user ada sebelum menghapus
        const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
        if (result.rowCount === 0) return null;
        return { message: 'User deleted' };
    }
};

module.exports = User;
