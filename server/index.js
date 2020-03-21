const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js')

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

function handleError(res, err) {
  console.log(err);
  res.status(418).send('an error occurred: ' + err);
}

//Push benachrichtigung von hier schicken

app.get('/', (req, res) => {
  res.send('You may be Infected :(');
});

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

app.post('/infected', (req, res) => {
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

app.get('/contacted', (req, res) => {
  const { id } = req.query;

  let sql = `SELECT person.id, person.firstname, person.lastname, contact.time
    FROM contact, person
    WHERE (contact.person1id = person.id
    AND contact.person2id = ?)
    OR (contact.person2id = person.id
    AND contact.person1id = ?);`;

  db.all(sql, [id, id], (err, rows) => {
    if (err) return handleError(res, err);

    res.status(200).send(rows);
  })
})

app.post('/contacted', (req, res) => {
  const { id1, id2 } = req.body;

  let sql = `INSERT INTO contact (person1id, person2id)
    VALUES (?, ?);`;
  db.run(sql, [id1, id2], err => {
    if (err) return handleError(res, err);

    console.log(`added infection between ${id1} and ${id2}`);
    res.status(200).send("");
  })
})

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

// catch all errors
app.all('*', (req, res) => res.status(404).send('not found'))
