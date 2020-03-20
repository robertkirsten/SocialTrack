var express = require('express');
var app = express();

let infectedPersons = []

//Push benachrichtigung von hier schicken

app.get('/', function (req, res) {
  res.send('You may be Infected :(');
});

app.post('/infected', function(req, res){
  console.log("Added Person with uid: ", req.body.uid);

  let data = {
    uid: req.body.uid,
    contacted: req.body.contacted
  }

  infectedPersons.push(data);
  data.contected.forEach(user => {
    alertUser(user);
  });
 
  res.send("");
});

function alertUser(){
  //Send push Message to possibly infected user
}

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});