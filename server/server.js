const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// use request bodies
app.use(bodyParser.urlencoded({
  extended: true,
}));

// mount all routes
app.use(routes);

// run server on localhost:3000
app.listen(3000, () => console.log('App listening on port 3000!'));
