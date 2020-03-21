const app = require('express')();

module.exports = app;

const db = require('../db');
const handleError = require('../handleError');

app.post('/', (req, res) => {
  const { id, infected } = req.body;

  const sql = `UPDATE person
    SET infected = ?
    WHERE id = ?;`;

  db.run(sql, [infected, id], (err) => {
    if (err) {
      handleError(res, err);
      return;
    }

    console.log(`Person ${id} got new infection status ${infected}`);
    res.status(200).send('');
  });
});
