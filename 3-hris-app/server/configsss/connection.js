const { Pool } = require("pg");

const pool = new Pool({
  user: "user_test",
  host: "103.76.120.109",
  database: "employee_db",
  password: "Demo1234",
  port: 5432,
});

module.exports = pool;
