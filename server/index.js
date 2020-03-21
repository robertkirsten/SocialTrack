let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({
  extended: true,
})

let infectedPersons = [];

//Push benachrichtigung von hier schicken

app.get('/', (req, res) => {
  res.send('You may be Infected :(');
});

app.get('/user', (req, res) => {
  //Queryparams:
  const id = req.query.id;
  res.send(id);
});

app.post('/user', (req, res) => {
  //Body: id, vorname, nachname, infiziert
  //Queryparams:
  //req.body.id: SQL-Query
  //Auf
  const id = req.query.id;

  res.send(id);
});




app.post('/infected', (req, res) => {
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