var express = require('express');
var app = express();

//Push benachrichtigung von hier schicken

app.get('/', function (req, res) {
  res.send('You may be Infected :(');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});