const app = require('express')();

module.exports = app;

const db = require('../db');
const handleError = require('../handleError');

app.get('/', (req, res) => {
  const { id } = req.query;

  const sql = `SELECT person.id, person.firstname, person.lastname, contact.time
    FROM contact, person
    WHERE (contact.person1id = person.id
    AND contact.person2id = ?)
    OR (contact.person2id = person.id
    AND contact.person1id = ?);`;

  db.all(sql, [id, id], (err, rows) => {
    if (err) {
      handleError(res, err);
      return;
    }

    res.status(200).send(rows);
  });
});

app.post('/contacted', (req, res) => {
  const { id1, id2 } = req.body;

  const sql = `INSERT INTO contact (person1id, person2id)
    VALUES (?, ?);`;
  db.run(sql, [id1, id2], (err) => {
    if (err) {
      handleError(res, err);
      return;
    }

    console.log(`added infection between ${id1} and ${id2}`);
    res.status(200).send('');
  });
});
