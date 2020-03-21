const app = module.exports = require('express')();
const db = require('../db');
const handleError = require('../handleError');

app.get('/user', (req, res) => {
  const id = req.query.id;

  let sql = `SELECT *
    FROM person
    WHERE id = ?; `;

  db.get(sql, [id], (err, row) => {
    if (err) return handleError(res, err);
    res.send(row);
  })
});

app.post('/user', (req, res) => {
  const { id, firstname, lastname, infected } = req.body;

  let sql = `INSERT INTO person (id, firstname, lastname, infected)
    VALUES (?, ?, ?, ?);`;
  db.run(sql, [id, firstname, lastname, infected], err => {
    if (err) return handleError(res, err);

    console.log(`stored person with id ${id}`);
    res.status(200).send("");
  })
});
