const app = require('express')();

module.exports = app;

const db = require('../db');
const handleError = require('../handleError');

app.get('/', (req, res) => {
  const { id } = req.query;

  const sql = `SELECT *
    FROM person
    WHERE id = ?; `;

  db.get(sql, [id], (err, row) => {
    if (err) {
      handleError(res, err);
      return;
    }

    res.send(row);
  });
});

app.post('/', (req, res) => {
  const {
    id, firstname, lastname, infected,
  } = req.body;
  console.log(req.body);

  let sql = `SELECT *
    FROM person
    WHERE id = ?;`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      handleError(res, err);
      return;
    }

    if (row) {
      sql = `UPDATE person
        SET firstname = ?,
          lastname = ?
        WHERE id = ?;`;
      db.run(sql, [firstname, lastname, id], (err2) => {
        if (err2) {
          handleError(res, err2);
          return;
        }

        console.log(`updated name of person ${id}`);
        res.status(200).send('');
      });
    } else {
      sql = `INSERT INTO person (id, firstname, lastname, infected)
        VALUES (?, ?, ?, ?);`;
      db.run(sql, [id, firstname, lastname, infected], (err2) => {
        if (err2) {
          handleError(res, err2);
          return;
        }

        console.log(`stored person with id ${id}`);
        res.status(200).send('');
      });
    }
  });
});
