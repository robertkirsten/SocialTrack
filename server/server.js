const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js')
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(routes);

app.listen(3000, () => console.log('App listening on port 3000!'));
