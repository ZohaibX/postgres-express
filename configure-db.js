const pg = require('pg');

//! first run all the commands in database.sql file

const pool = new pg.Pool({
  user: 'postgres',
  password: 'Iqrabutt123',
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
});

module.exports = pool;
