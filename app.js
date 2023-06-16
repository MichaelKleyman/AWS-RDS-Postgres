const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

//Creating Pool instance to manage the database connection
const pool = new Pool({
  user: 'postgres',
  host: 'database-1.cuczszdg5wp8.us-east-1.rds.amazonaws.com',
  database: 'sampleDB',
  password: '206480220aB',
  port: 5432,
});

app.get('/users', async (req, res) => {
  try {
    const data = await pool.query('SELECT * from "User"');
    console.log(data.rows);
    res.send(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data');
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
