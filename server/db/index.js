const {Pool, Client} = require('pg');


const pool = new Pool({
  host: 'localhost',
  database: 'reviews-service',
  port: 5432
});

pool.query('SELECT * FROM users WHERE user_id < 10', (err, res) => {
  console.log(err, res.rows)
  pool.end();
})

