const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js')

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

function handleError(res, err) {
  console.log(err);
  res.status(402).send('an error occurred: ' + err);
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

function alertUser(){
  //Send push Message to possibly infected user
}

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});

// catch all errors
app.all('*', (req, res) => res.status(404).send('not found'))
