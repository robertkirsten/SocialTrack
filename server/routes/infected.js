const app = require('express')();

module.exports = app;

const db = require('../db');
const handleError = require('../handleError');

app.post('/', (req, res) => {
  const { id } = req.body;

  const sql = `UPDATE person
    SET infected = 1
    WHERE id = ?;`;

  db.run(sql, [id], (err) => {
    if (err) {
      handleError(res, err);
      return;
    }

    console.log(`Person ${id} got infected`);
    res.status(200).send('');
  });
});
