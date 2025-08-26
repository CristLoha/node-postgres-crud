const { Pool } = require('pg');

const pool = new Pool({
    user: 'bacoding',
    host: 'localhost',
    database: 'latihan_crud',
    password: '',
    port: 5432,
});

module.exports = pool;
