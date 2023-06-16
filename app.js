const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

app.post('/users', async (req, res) => {
  try {
    const query = 'INSERT INTO "User" (name, description) Values ($1, $2)';
    const { name, description } = req.body;
    await pool.query(query, [name, description]);
    res.status(201).send('Successful post request');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error with adding data to the table');
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM "User" WHERE id=$1';
    await pool.query(query, [id]);
    res.status(201).send('User deleted successfully');
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
