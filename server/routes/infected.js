const app = module.exports = require('express')();
const db = require('../db');
const handleError = require('../handleError');

app.post('/', (req, res) => {
  const { id } = req.body;

  let sql = `UPDATE person
    SET infected = 1
    WHERE id = ?;`;

  db.run(sql, [id], (err) => {
    if (err) return handleError(res, err);

    console.log(`Person ${id} got infected`);
    res.status(200).send("");
  })

  res.send("");
});
