const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const pool = require('./configure-db'); // database

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//!--------------------------------------- Routes ----------------------------------------------------------
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (error) {
    console.error('error from get request', err.message);
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error('error from the single get request', err.message);
  }
});

app.post('/todos', async (req, res) => {
  const { description } = req.body;
  try {
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    // INSERT INTO is a post command
    //? todo is the table
    // (description is a property of the table)

    //! adding multiple properties
    // 'INSERT INTO monsters (name, personality) VALUES($1, $2) RETURNING *', [name, personality],

    res.json(newTodo.rows[0]); // actual todo -- sending data
  } catch (error) {
    console.log('error found from post request', err.message);
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE id = $2 RETURNING *',
      [description, id]
    );
    res.json(updatedTodo.rows[0]); // update function doesn't return anything

    //? Updating multiple properties
    // UPDATE posts SET title = $1, body = $2, user_id = $3, author= $5, date_created = NOW() WHERE pid/id = $4', [values]
  } catch (error) {
    console.log('error found from update request', err.message);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      'DELETE FROM todo WHERE id = $1 RETURNING *',
      [id]
    );

    res.json(deletedTodo.rows[0]);
  } catch (error) {
    console.log('error found from delete request', err.message);
  }
});
//!--------------------------------------- Routes Ends----------------------------------------------------------

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
