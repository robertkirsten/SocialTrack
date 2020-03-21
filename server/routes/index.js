const app = module.exports = require('express')();

app.get('/', (req, res) => res.send('You may be Infected :('));

app.use('/user', require('./user'));
app.use('/infected', require('./infected'));
app.use('/contacted', require('./contacted'));

// catch all errors
app.all('*', (req, res) => res.status(404).send('not found'))
